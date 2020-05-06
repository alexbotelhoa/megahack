/* eslint-disable default-case */
let buildSelect;

function moveHorizontalBuild(nrPredio, addInicio, addEspaco) {
   const primeiroPredio = - 9000 + addInicio
   const espacoEntrePredios = 700 + addEspaco
   return primeiroPredio + (espacoEntrePredios * nrPredio)
}

function moveVerticalBuild(nrQuadra, addInicio, addEspaco) {
   const primeiraQuadra = - 9000 + addInicio
   const espacoEntreQuadras = 700 + addEspaco
   return primeiraQuadra + (espacoEntreQuadras * nrQuadra)
}

function building(select) {
   switch (select) {
      case 1: buildSelect = 'Building_Auto Service'; break
      case 2: buildSelect = 'Building_Bakery'; break
      case 3: buildSelect = 'Building_Bar'; break
      
      case 4: buildSelect = 'Building_Books Shop'; break
      case 5: buildSelect = 'Building_Chicken Shop'; break
      case 6: buildSelect = 'Building_Clothing'; break
      case 7: buildSelect = 'Building_Coffee Shop'; break

      case 8: buildSelect = 'Building_Drug Store'; break
      case 9: buildSelect = 'Building_Factory'; break
      case 10: buildSelect = 'Building_Fast Food'; break
      case 11: buildSelect = 'Building_Fruits  Shop'; break
      case 12: buildSelect = 'Building_Gas Station'; break
      case 13: buildSelect = 'Building_Gift Shop'; break
      case 14: buildSelect = 'Building_Music Store'; break
      case 15: buildSelect = 'Building_Pizza'; break
      case 16: buildSelect = 'Building_Restaurant'; break
      case 17: buildSelect = 'Building_Shoes Shop'; break
      case 18: buildSelect = 'Building_Super Market'; break
   }
   return buildSelect
}

export function Build([selectBuild, nrBuild, addInicioHori, addEspacoHori, altura, nrRoad, addInicioVer, addEspacoVert]) {
   return [
      building(selectBuild), 
      moveHorizontalBuild(
         nrBuild,
         addInicioHori,
         addEspacoHori
      ),
      altura,
      moveVerticalBuild(
         nrRoad,
         addInicioVer,
         addEspacoVert
      )
   ]
}