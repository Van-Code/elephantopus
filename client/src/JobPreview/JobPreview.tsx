import { useState } from 'react';
import './card.scss';
import { Job } from '../types';

function JobPreview(props: Job) {

  const { id, name: jobTitle, date, companyName, contents: description, locationName } = props;
  const summary = description.slice(0, 300);
  let desc = summary;

  const [expand, setExpansion] = useState(false);

  let placesPath = 'https://maps.googleapis.com/maps/api/place';

  function handleClick() {
    setExpansion(!expand);
  }

  function formatDate(date: string) {
    //format the posting date to mon dd
    const d = new Date(date);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return monthNames[d.getMonth()] + ' ' + d.getUTCDate();
  }


  function getPlacesImage(company: string) {
    if (process.env.NODE_ENV !== 'production') {
      placesPath = 'https://lh4.googleusercontent.com/-1wzlVdxiW14/USSFZnhNqxI/AAAAAAAABGw/YpdANqaoGh4/s1600-w400/Google%2BSydney?';
    }

    try {
      //to get the image we need to get the photo reference id
      return placesPath += `/place/photo?key=${process.env.REACT_APP_GOOGLE_KEY}&input=${company}&photoreference=${getRefName(company)}`
    }
    catch {
      // add a fallback image
      return './images/places.jpeg';
    }
  }

  function getRefName(company: string) {
    //get the reference id by company name
    if (process.env.NODE_ENV !== 'production') {
      placesPath = '/json/mockPlaces.json?';
    }
    placesPath += `/place/findplacefromtext/json?inputtype=textquery&fields=photos&key=${process.env.REACT_APP_GOOGLE_KEY}&input=${company}`

    return fetch(placesPath).then(resp => resp.json()).then(data => { return data.candidates[0].photos[0].photo_reference })
  }
  //toggle the length of description copy
  if (expand) {
    desc = description
  } else {
    desc = summary
  }

  const formattedDate = formatDate(date)
  return (
    <div className="card" key={id}>
      <button className="button--reset" onClick={handleClick}><h1>{jobTitle}</h1></button>
      <h2>At {companyName} - {locationName}</h2>
      <h3>Posted On {formattedDate}</h3>
      {expand && <img src={getPlacesImage(companyName)} alt="" />}
      <span dangerouslySetInnerHTML={{ __html: desc }}></span>
      <button className="button--reset button--display" onClick={handleClick}>{!expand ? '...Show More' : 'Show Less'}</button>
    </div>
  );
}

export default JobPreview;
