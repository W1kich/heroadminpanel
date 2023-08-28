import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeFilterChanged, fetchFilters, selectAll} from './filtersSlice';
import Spinner from '../spinner/Spinner';
import classNames from 'classnames';
import store from '../../store/index';

const HeroesFilters = () => {

	const { filtersLoadingStatus, activeFilter} = useSelector(state => state.filters);
	const filters = selectAll(store.getState());
	const dispatch = useDispatch();
	
	useEffect(() => {
			dispatch(fetchFilters());
	}, []);

	

	if (filtersLoadingStatus === "loading") {
		return <Spinner/>;
	} else if (filtersLoadingStatus === "error") {
			return <h5 className="text-center mt-5">Помилка завантаження</h5>
	}

	const filtersList = (filters) =>{		
		return filters.map(({name, label, className}) =>{
			const btnClass = classNames('btn', className, {
				'active': name === activeFilter
			});
			return (
				<button onClick={() => dispatch(activeFilterChanged(name))} className={btnClass} >{label}</button>
			)
		})
	}

	const element = filtersList(filters);

	return (
			<div className="card shadow-lg mt-4">
					<div className="card-body">
							<p className="card-text">Відфільтруйте героїв за елементами</p>
							<div className="btn-group">
									{element}
							</div>
					</div>
			</div>
	)
}

export default HeroesFilters;