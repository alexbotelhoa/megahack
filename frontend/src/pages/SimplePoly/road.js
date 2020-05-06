/* eslint-disable default-case */
let roadSelect;

function moveHorizontalRoad(nrRua, addInicio = 0, addEspaco = 0) {
   const primeiraRua = - 9000 + addInicio
   const espacoEntreRuas = 700 + addEspaco
   return primeiraRua + (espacoEntreRuas * nrRua)
}

function moveVerticalRoad(nrAvenida, addInicio = 0, addEspaco = 0) {
   const primeiraAvenida = - 9000 + addInicio
   const espacoEntreAvenidas = 700 + addEspaco
   return primeiraAvenida + (espacoEntreAvenidas * nrAvenida)
}

function road(select) {
   switch (select) {
      case 1: roadSelect = 'Road Concrete Tile Small'; break
      case 2: roadSelect = 'Road Concrete Tile'; break
      case 3: roadSelect = 'Road Corner_01'; break
      case 4: roadSelect = 'Road Corner_02'; break
      case 5: roadSelect = 'Road Intersection_01'; break
      case 6: roadSelect = 'Road Intersection_02'; break
      case 7: roadSelect = 'Road Lane Bus Stop'; break
      case 8: roadSelect = 'Road Lane Half'; break
      case 9: roadSelect = 'Road Lane_01'; break
      case 10: roadSelect = 'Road Lane_02'; break
      case 11: roadSelect = 'Road Lane_03'; break
      case 12: roadSelect = 'Road Lane_04'; break
      case 13: roadSelect = 'Road Split Line'; break
      case 14: roadSelect = 'Road T_Intersection_01'; break
      case 15: roadSelect = 'Road T_Intersection_02'; break
      case 16: roadSelect = 'Road Tile Small'; break
      case 17: roadSelect = 'Road Tile'; break
   }
   return roadSelect
}

export function Road([selectRoad, nrRoad, addInicioHori, addEspacoHori, altura, nrAvenue, addInicioVer, addEspacoVert]) {
   return [
      road(selectRoad), 
      moveHorizontalRoad(
         nrRoad,
         addInicioHori,
         addEspacoHori
      ),
      altura,
      moveVerticalRoad(
         nrAvenue,
         addInicioVer,
         addEspacoVert
      )
   ]
}