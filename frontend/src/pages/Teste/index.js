import React from 'react'
import './styles.css'

import { Build } from './build'
import { Road } from './road'

const testeAddDom = document.createElement('div')
testeAddDom.innerHTML = "Página de teste vinda do Index"
document.body.appendChild(testeAddDom)

const build = Build(15, 25)
console.log(Build(15, 25))
console.log(Build(152, 25))
console.log(Build(154, 25))
console.log(Build(159, 25))
const buildDom = document.createElement('div')
buildDom.innerHTML = build
document.body.appendChild(buildDom)

const road = Road()
console.log(Road())
const roadDom = document.createElement('div')
roadDom.innerHTML = road
document.body.appendChild(roadDom)

export default function Teste() {
	return (
			<body>
            {/* <div id="build"></div> */}
            <div id="road"></div>
            <h1>Hellow Wolrd</h1>
			</body>
	)
}