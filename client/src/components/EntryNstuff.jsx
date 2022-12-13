import { useState } from 'react';
import AddEntry from './AddEntry.jsx';

import Footer from './Footer.jsx'
import Login from './Login.jsx'

const EntryNstuff = () => {

	const [ Entry, setEntry ] = useState(false);


	const ShowEntries = () => {
		setEntry(true);
	}

	return (
		<div id="EntryNstuff">
	      <h1>Entries</h1>
	      <AddEntry />
	      <hr />
	      <Footer />
		</div>
	);
}; 
export default EntryNstuff;