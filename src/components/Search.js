import React, { useState } from 'react';
import { InputGroup, FormControl, Spinner, Col, Row, Alert } from 'react-bootstrap';
import axios from 'axios';
import BookCard from './BookCard.js';
import '../assets/scss/app.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import Placeholder from '../assets/images/placeholder.png'


function Search() {
  	const [result, setResult] = useState('');
 	const [loading, setLoading] = useState(false);
  	const [cards, setCards] = useState([]);

	const handleSubmit = () => {
    	setLoading(true);
     
      	axios.get(
			  `https://www.googleapis.com/books/v1/volumes?q=${result}&maxResults=40`
        	)
			.then(res => {
				setCards(res.data.items);
				setLoading(false);
			})
			.catch(err => {
				setLoading(true);
				console.log(err.response);
			});
    
  };

  const mainHeader = () => {
    return (
      <div className='main-image d-flex justify-content-center align-items-center flex-column mb-3'>
        <h1>
          Book Search
        </h1>
        <div className="search-box">
          <InputGroup size='lg' className='mb-3'>
            <FormControl
              placeholder='Book Search'
              value={result}
              onChange={e => setResult(e.target.value)}
            />
            <InputGroup.Append>
              <button className="btn theme-btn" onClick={handleSubmit}>
			    <FontAwesomeIcon icon={faSearch} size="xs"/>
              </button>
            </InputGroup.Append>
          </InputGroup>
        </div>
      </div>
    );
  };

  const handleCards = () => {
    if (loading) {
      return (
        <div className='d-flex justify-content-center mt-3'>
          <Spinner style={{ width: '3rem', height: '3rem' }} />
        </div>
      );
	} else if (cards) {
		const items = cards.map((item) => {
			let thumbnail = '';
			if (item.volumeInfo.imageLinks) {
				thumbnail = item.volumeInfo.imageLinks.thumbnail;
			} else {
				thumbnail = Placeholder;
			}
			let authors = '';
			if (item.volumeInfo.authors) {
				authors = item.volumeInfo.authors;
			} else {
				authors = 'No info added';
			}
			
			return (
			<Col className="search-result mb-3" md={6} lg={3} key={item.id}>
				<BookCard
					thumbnail={thumbnail}
					title={item.volumeInfo.title}
					pageCount={item.volumeInfo.pageCount}
					language={item.volumeInfo.language}
					authors={authors}
					publisher={item.volumeInfo.publisher}
					description={item.volumeInfo.description}
					previewLink={item.volumeInfo.previewLink}
					infoLink={item.volumeInfo.infoLink}
				/>
			</Col>
			);
		});
	return (
		<div className="padding-x-row padding-y-row">
			<Row>{items}</Row>
		</div>
	);
	} else {
		return (
			<div className='text-center'>
				<Alert variant="danger">Your search returned 0 results.</Alert>
			</div>
		);

	}
};
// handleCards end
  	return (
    	<div>
      		{mainHeader()}
      		{handleCards()}
    	</div>
  	);
}

export default Search;