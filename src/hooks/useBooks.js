import { useEffect, useState } from 'react'
import { db } from '../firebase'
import { useAuth } from '../contexts/AuthContext'

const useBooks = () => {
	const [books, setBooks] = useState([])
	const { currentUser } = useAuth()
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		
		const unsubscribe = db.collection('books')
			.onSnapshot(snapshot => {
				setLoading(true)
				const snapshotBooks = []

				snapshot.forEach(doc => {
					snapshotBooks.push({
						id: doc.id,
						...doc.data(),
					})
				})

			setBooks(snapshotBooks)
			setLoading(false)
		})

		return unsubscribe
    }, [currentUser.uid])
    
	return { books, loading }
}

export default useBooks