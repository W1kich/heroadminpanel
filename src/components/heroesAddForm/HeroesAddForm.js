import {useHttp} from '../../hooks/http.hook';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { heroeAdd } from '../heroesList/heroesSlice';
import store from '../../store/index';
import {selectAll} from '../heroesFilters/filtersSlice';

const HeroesAddForm = () => {

	const {request} = useHttp();
	const {filtersLoadingStatus} = useSelector(state => state.filters);
	const filters = selectAll(store.getState());
	const [heroDescription, setHeroDescription] = useState('');
	const [heroName, setHeroName] = useState('');
	const [heroElement, setHeroElement] = useState('');
	const dispatch = useDispatch();

	const onSumbitUpdate = (e) =>{
		e.preventDefault();

		const newHero ={
			id: uuidv4(),
			name: heroName,
			description: heroDescription,
			element: heroElement
		}

		dispatch(heroeAdd(newHero));
		// request("http://localhost:3001/heroes", "POST", JSON.stringify(newHero))
		// .then(() => console.log(newHero, 'Add'))
		// .then(() => dispatch(HeroeAdd(newHero)))
		// .catch(err => console.log(err));

	// 	setHeroName('');
	// 	setHeroDescription('');
	// 	setHeroElement('');
		}


		const renderFilters = (filters, status) => {
			if (status === "loading") {
					return <option>Загрузка элементов</option>
			} else if (status === "error") {
					return <option>Ошибка загрузки</option>
			}
			if (filters && filters.length > 0 ) {
					return filters.map(({name, label}) => {
							if (name === 'all')  return;
							return <option key={name} value={name}>{label}</option>
					})
			}
	}

	return (
			<form
			 onSubmit={onSumbitUpdate} 
			className="border p-4 shadow-lg rounded">
					<div className="mb-3">
							<label htmlFor="name" className="form-label fs-4">Ім'я нового героя</label>
							<input 
									required
									type="text" 
									name="name" 
									className="form-control" 
									id="name" 
									value={heroName}
									onChange={(e) => setHeroName(e.target.value)}
									placeholder="Як мане звати?"/>
					</div>

					<div className="mb-3">
							<label htmlFor="text" className="form-label fs-4">Опис</label>
							<textarea
									required
									name="text" 
									className="form-control" 
									id="text" 
									value={heroDescription}
									onChange={(e) => setHeroDescription(e.target.value)}
									placeholder="Що я вмію?"
									style={{"height": '130px'}}/>
					</div>

					<div className="mb-3">
							<label htmlFor="element" className="form-label">Выбрать элемент героя</label>
							<select 
									required
									className="form-select" 
									id="element" 
									value={heroElement}
									onChange={(e) => setHeroElement(e.target.value)}
									name="element">
									<option >Я володію елементом...</option>
									{renderFilters(filters, filtersLoadingStatus)}
							</select>
					</div>

					<button type="submit" className="btn btn-primary">Створити</button>
			</form>
	)
}

export default HeroesAddForm;