import React, { useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import useLaunches from '../useLaunches/useLaunches';
import Youtube from 'react-youtube';

import './details.css';

import Main from '../Main/Main';

const Details = (props) => {
	//console.log(props.match.params.id);
	const [launch, setLaunch] = useState(null);
	const { getLaunch } = useLaunches();

	useEffect(() => { // залезли в пропсы и достали id
		setLaunch(getLaunch(props.match.params.id));
	}, [getLaunch]);
	//console.log(launch);

	const history = useHistory();

	if(!launch) return null; // лучше прелоадер сделать

	return (
		<>
			<Main name={launch.name}/>
			<main className="details">
				<div className="container">
					<div className="details-row">
						<div className="details-image">
							<img src={launch.links.patch.small} alt={launch.name} />
						</div>
						<div className="details-content">
							<p className="details-description">{launch.details}</p>
						</div>
					</div>					
					<Youtube className='details-youtube' videoId={launch.links.youtube_id} />
				</div>
				<a onClick={history.goBack} className="button button-back">go back</a>
			</main>
		</>
	);
};

export default Details;