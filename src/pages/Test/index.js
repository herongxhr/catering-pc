import React from 'react'
import Bread from '../../components/Bread'

class Test extends React.Component {
	render() {
		const bread = [{
			href:'/home',
			breadContent:'主页'
		},{
			href:'/menubar',
			breadContent:'菜单中心'
		},{
			href:'/order',
			breadContent:'订餐'
		}]
		return(
			<div>
				<Bread bread={bread} />
			</div>
		)
	}
}

export default Test