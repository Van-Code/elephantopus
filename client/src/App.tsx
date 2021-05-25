
import { useEffect, useState } from 'react';
import JobPreview from './JobPreview/JobPreview';
import { JobInitial } from './types';
import './App.scss';

export function Loading() {
    return (<div>Loading...</div>)
}

export function ListRow(props: { job: JobInitial }) {
    const job = props.job;
    return (<JobPreview key={job.id} id={job.id} name={job.name} date={job.publication_date} contents={job.contents} companyName={job.company.name} locationName={job.locations[0].name} ></JobPreview>
    )
}

function App() {
    let [isLoading, setStatus] = useState(true);
    let [jobsList, setList] = useState([]);

    useEffect(() => {
        //fetch the jobs once
        let endPoint = 'https://www.themuse.com/api/public/jobs?page=1&size=Small%20Size';
        if (process.env.NODE_ENV === 'development') {
            endPoint = '/json/mockData.json';
        }

        fetch(endPoint)
            .then((resp) => resp.json())
            .then((data) => {
                setList(data.results);
                setStatus(false);
            });
    }, []);

    let mainContent;

    if (isLoading) {
        //show the loading text
        mainContent = <Loading />
    } else if (jobsList.length === 0) {
        //shows no results
        mainContent = <div>No results</div>;
    } else {
        //iterate through array of jobs and create the row for each job
        mainContent = jobsList.map((job: JobInitial) => {
            return <ListRow job={job} key={job.id} />
        })
    }
    return (
        <div className='App'>
            <header className="App__header">Muse Job Board</header>
            <main>
                {mainContent}
            </main>
        </div>
    );
}
export default App;