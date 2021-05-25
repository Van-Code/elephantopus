import JobPreview from "./JobPreview";
import { render, fireEvent, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect';

import mockData from "../../public/json/mockData.json";
const job = mockData.results[0];

const renderApp = function () {
    return render(<JobPreview key={job.id} id={job.id} name={job.name} date={job.publication_date} contents={job.contents} companyName={job.company.name} locationName={job.locations[0].name} />);
}

test('loads a card', async () => {
    renderApp();
    const card = document.querySelector('.card');
    expect(card).toBeInTheDocument()
})

test('display all fields in card', async () => {
    renderApp();

    expect(document.querySelector('h1')).toHaveTextContent('Global Strategic Account Executive - PNW');
    expect(screen.findByText(/At Sprinklr - Flexible \/ Remote/)).toBeTruthy()
    expect(screen.findByText(/Posted On May 20/)).toBeTruthy();
})
test('clicking expand should show full description', async () => {
    renderApp();
    let desc = screen.getAllByTestId('desc');
    expect(desc.length).toBeLessThan(300);

})
test('clicking expand should show full description', async () => {
    renderApp();

    fireEvent.click(screen.getByText('...Show More'));
    await screen.getByTestId('desc')
    const desc = screen.getByTestId('desc').textContent;
    expect(desc?.length).toBeGreaterThan(300)
})