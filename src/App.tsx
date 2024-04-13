import { useEffect, useState } from 'react'
import * as C from './App.styles'
import logoImage from  './assets/devmemory_logo.png'
import {InfoItem} from './components/InfoItem'
import { Button } from './components/button'
import reiniciar from './svgs/restart.svg'
import { GridItemType } from './types/gridItemType'
import { items } from './data/items'
import { GridItem } from './components/gridItem'
import { formactTime } from './helpers/formactTimeElapsed'

const App = () => {
    const [timeElepsed, setTimeElepsed] = useState<number>(0);
    const [playing, setPlaying] = useState<boolean>(false)
    const [moveCount, setMoveCount] = useState(0);
    const [showCount, setShowCount] = useState(0);
    const [gridItems, setGridItems] = useState<GridItemType[]>([])
    useEffect(() => restartAndCreateGrid(), []);

    useEffect(()=>{
        const timer = setInterval(()=> {
            if(playing) setTimeElepsed(timeElepsed + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, [playing, timeElepsed]);

    useEffect(()=> {
        if(showCount === 2) {
            let oppened = gridItems.filter(item => item.shown === true);
            if(oppened.length === 2) {
                
                if(oppened[0].item === oppened[1].item) {
                    let tmpGrid = [...gridItems];
                    for(let i in tmpGrid) {
                        if(tmpGrid[i].shown) {
                            tmpGrid[i].permanentShown = true;
                            tmpGrid[i].shown = false
                        }
                    }
                    setGridItems(tmpGrid);
                    setShowCount(0);
                    
                } else {
                    setTimeout(() => {
                        let tmpGrid = [...gridItems];
                        for(let i in tmpGrid) {
                            tmpGrid[i].shown = false;
                        }
                        setGridItems(tmpGrid);
                        setShowCount(0);
                    }, 1000);
                }
                
                setMoveCount( moveCount => moveCount + 1);
            }
        }
    }, [showCount, gridItems]);

    useEffect(() => {
        if(moveCount > 0 && gridItems.every(item => item.permanentShown === true)) {
            setPlaying(false);
        }
    }, [moveCount, gridItems]);
    const restartAndCreateGrid = () => {
        setTimeElepsed(0);
        setShowCount(0);
        setMoveCount(0);

        let tmpGrid: GridItemType[] = [];
        for(let i = 0; i < (items.length * 2); i++) tmpGrid.push({
            item: null, shown: false, permanentShown: false
        }); 
        
        for(let w = 0; w < 2; w++) {
            for(let i = 0; i < items.length; i++) {
                let posicao = -1;
                while(posicao < 0 || tmpGrid[posicao].item !== null) {
                    posicao = Math.floor(Math.random() * (items.length * 2));
                }
                tmpGrid[posicao].item = i;
            }
        }

        setGridItems(tmpGrid);
        setPlaying(true);

       
    }

    const handleItemClick = (index: number) => {
        if(playing && index !== null && showCount < 2) {
            let tmpGrid = [...gridItems];
            if(tmpGrid[index].permanentShown === false && tmpGrid[index].shown === false) {
                tmpGrid[index].shown = true;
                setShowCount(showCount + 1)
            }

            setGridItems(tmpGrid)
        }
    }
    
    return (
        <C.container>
            <C.Info>
                <C.LogoLink href="">
                    <img src={logoImage} width="200" alt="" />
                </C.LogoLink>
                <C.InfoArea>
                    <InfoItem label="tempo" value={formactTime(timeElepsed)}/>
                    <InfoItem label="movimentos" value={moveCount.toString()}/>
                </C.InfoArea>
                <Button label='Reiniciar' icon={reiniciar} onClick={restartAndCreateGrid}/>
            </C.Info>
            <C.GridArea>
                <C.Grid>
                    {gridItems.map((item, index) => (
                        <GridItem
                            key={index}
                            item={item}
                            onClick={()=>handleItemClick(index)}
                        />
                    ))}
                </C.Grid>
            </C.GridArea>
        </C.container>
    )
}

export default App;