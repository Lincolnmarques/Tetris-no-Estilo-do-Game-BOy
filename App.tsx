import React, { useState, useCallback, useEffect, useMemo } from 'react';
import Stage from './components/Stage';
import Display from './components/Display';
import StartButton from './components/StartButton';
import ControlsInfo from './components/ControlsInfo'; // Import the new component
import { STAGE, PLAYER } from './types';
import { createStage, checkCollision, randomTetromino, STAGE_WIDTH } from './services/gameHelpers';

const App: React.FC = () => {
    const [player, setPlayer] = useState<PLAYER>({
        pos: { x: 0, y: 0 },
        tetromino: [[0]],
        collided: false,
    });
    const [stage, setStage] = useState<STAGE>(createStage());
    const [score, setScore] = useState(0);
    const [rows, setRows] = useState(0);
    const [level, setLevel] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [dropTime, setDropTime] = useState<number | null>(null);

    const linePoints = [40, 100, 300, 1200];

    const resetPlayer = useCallback(() => {
        const newTetromino = randomTetromino();
        setPlayer({
            pos: { x: STAGE_WIDTH / 2 - 1, y: 0 },
            tetromino: newTetromino.shape,
            collided: false,
        });
    }, []);

    const startGame = useCallback(() => {
        setStage(createStage());
        setDropTime(1000);
        resetPlayer();
        setGameOver(false);
        setScore(0);
        setRows(0);
        setLevel(0);
    }, [resetPlayer]);

    const movePlayer = useCallback((dir: -1 | 1) => {
        setPlayer(prev => {
            if (checkCollision(prev, stage, { x: dir, y: 0 })) {
                return prev;
            }
            return { ...prev, pos: { ...prev.pos, x: prev.pos.x + dir } };
        });
    }, [stage]);

    const rotatePlayer = useCallback(() => {
        setPlayer(prev => {
            const playerClone = JSON.parse(JSON.stringify(prev));
            const { tetromino } = playerClone;

            const rotatedTetro = tetromino.map((_: any, index: number) => tetromino.map((col: any[]) => col[index]));
            playerClone.tetromino = rotatedTetro.map((row: any[]) => row.reverse());

            const pos = playerClone.pos.x;
            let offset = 1;
            while (checkCollision(playerClone, stage, { x: 0, y: 0 })) {
                playerClone.pos.x += offset;
                offset = -(offset + (offset > 0 ? 1 : -1));
                if (offset > playerClone.tetromino[0].length) {
                    return prev;
                }
            }
            return playerClone;
        });
    }, [stage]);

    const drop = useCallback(() => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
            setDropTime(1000 / (level + 1) + 200);
        }

        setPlayer(prev => {
            if (checkCollision(prev, stage, { x: 0, y: 1 })) {
                if (prev.pos.y < 1) {
                    setGameOver(true);
                    setDropTime(null);
                }
                return { ...prev, collided: true };
            }
            return { ...prev, pos: { ...prev.pos, y: prev.pos.y + 1 }, collided: false };
        });
    }, [stage, rows, level]);
    
    const dropPlayer = useCallback(() => {
      setDropTime(null);
      drop();
    }, [drop]);

    const hardDropPlayer = useCallback(() => {
        setDropTime(null);
        setPlayer(prev => {
            let y = prev.pos.y;
            while (!checkCollision(prev, stage, { x: 0, y: y - prev.pos.y + 1 })) {
                y++;
            }
            if (y < 1) {
                setGameOver(true);
            }
            return { ...prev, pos: { ...prev.pos, y }, collided: true };
        });
    }, [stage]);

    const sweepRows = useCallback((stageToSweep: STAGE): STAGE => {
        let clearedRowsCount = 0;

        const stageAfterSweep = stageToSweep.reduce((acc: STAGE, row) => {
            if (row.findIndex(cell => cell[0] === 0) === -1) {
                clearedRowsCount += 1;
                acc.unshift(new Array(stageToSweep[0].length).fill([0, 'clear']));
                return acc;
            }
            acc.push(row);
            return acc;
        }, []);

        if (clearedRowsCount > 0) {
            setScore(prev => prev + linePoints[clearedRowsCount - 1] * (level + 1));
            setRows(prev => prev + clearedRowsCount);
        }
        
        return stageAfterSweep;
    }, [level, linePoints]);


    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!gameOver) {
            if (event.key.toLowerCase() === 'a' || event.key === 'ArrowLeft') {
                event.preventDefault();
                movePlayer(-1);
            } else if (event.key.toLowerCase() === 'd' || event.key === 'ArrowRight') {
                event.preventDefault();
                movePlayer(1);
            } else if (event.key.toLowerCase() === 's' || event.key === 'ArrowDown') {
                event.preventDefault();
                dropPlayer();
            } else if (event.key.toLowerCase() === 'w' || event.key === 'ArrowUp') {
                event.preventDefault();
                rotatePlayer();
            } else if (event.key === ' ') {
                event.preventDefault(); // Prevent page scrolling
                hardDropPlayer();
            }
        }
    }, [gameOver, movePlayer, dropPlayer, rotatePlayer, hardDropPlayer]);
    
    const displayStage = useMemo(() => {
        const newStage = JSON.parse(JSON.stringify(stage));
        if (!gameOver) {
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        const stageY = y + player.pos.y;
                        const stageX = x + player.pos.x;
                        if (newStage[stageY]?.[stageX]?.[1] === 'clear') {
                            newStage[stageY][stageX] = [value, 'clear'];
                        }
                    }
                });
            });
        }
        return newStage;
    }, [player, stage, gameOver]);
    
    useEffect(() => {
        if(player.collided) {
            const newStage = JSON.parse(JSON.stringify(stage));
            player.tetromino.forEach((row, y) => {
                row.forEach((value, x) => {
                    if (value !== 0) {
                        const stageY = y + player.pos.y;
                        const stageX = x + player.pos.x;
                        if (newStage[stageY] && newStage[stageY][stageX]) {
                            newStage[stageY][stageX] = [value, 'merged'];
                        }
                    }
                });
            });

            const finalStage = sweepRows(newStage);
            setStage(finalStage);
            resetPlayer();
        }
    }, [player.collided, player.pos, player.tetromino, resetPlayer, stage, sweepRows]);
    
    useEffect(() => {
      if (!gameOver && dropTime) {
          const gameInterval = setInterval(() => {
              drop();
          }, dropTime);
          
          return () => clearInterval(gameInterval);
      }
    }, [drop, dropTime, gameOver]);

    useEffect(() => {
        if (!dropTime && !gameOver) {
            setDropTime(1000 / (level + 1) + 200);
        }
    }, [dropTime, gameOver, level]);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleKeyDown]);

    return (
        <div className="w-screen h-screen flex items-center justify-center p-4 lg:p-8 text-slate-100 select-none overflow-hidden">
            <main className="w-full flex flex-col lg:flex-row gap-6 lg:gap-16 items-center lg:items-start justify-center lg:justify-evenly">
                {/* Left Side: Game Screen */}
                <div className="w-full max-w-xs lg:max-w-sm relative">
                     <div className="p-2 bg-slate-900/50 rounded-lg border-2 border-black/30 shadow-2xl">
                        <div className="w-full aspect-[10/20] bg-slate-400 rounded-md border-2 border-black/30 shadow-inner flex items-center justify-center">
                            {gameOver && (
                              <div className="absolute z-10 text-center text-slate-900">
                                <h2 className="text-2xl mb-4 font-bold">Game Over</h2>
                                <StartButton onClick={startGame} />
                              </div>
                            )}
                            <div className={`relative w-full h-full ${gameOver ? 'opacity-40' : ''}`}>
                               <Stage stage={displayStage} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Side: Info & Controls */}
                <div className="w-full max-w-xs lg:max-w-sm flex flex-col items-center gap-4">
                    <div className="text-center">
                        <div className="font-bold text-3xl [text-shadow:_2px_2px_0_rgb(0_0_0_/_0.5)]">
                           <span className="text-[#f8b800]">T</span>
                           <span className="text-[#d82800]">E</span>
                           <span className="text-[#0058f8]">T</span>
                           <span className="text-[#389800]">R</span>
                           <span className="text-[#a800f8]">I</span>
                           <span className="text-[#d82800]">S</span>
                        </div>
                    </div>
                    
                    <div className="space-y-3 w-full">
                        <Display text="Score" value={score} />
                        <Display text="Rows" value={rows} />
                        <Display text="Level" value={level} />
                    </div>
                    
                    <ControlsInfo />
                </div>
            </main>
        </div>
    );
};

export default App;