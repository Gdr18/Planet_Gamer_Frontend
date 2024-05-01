import { Link } from 'react-router-dom'

import { HiOutlineRocketLaunch } from 'react-icons/hi2'

import Navigation from '../navigation/navigation'
import Footer from '../footer'

export default function NoMatch() {
	return (
		<div>
			<Navigation />
			<div className='no-match-container'>
				<div className='no-match-wrapper'>
					<h3>
						Acaba de salir de nuestra órbita, por favor, móntese en el cohete
						para regresar con nosotros...
					</h3>
					<Link to='/'>
						<HiOutlineRocketLaunch className='icon-rocket' />
					</Link>
				</div>
			</div>
			<Footer />
		</div>
	)
}
