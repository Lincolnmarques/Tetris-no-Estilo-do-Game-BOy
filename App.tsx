

import React, { useState, useCallback, useEffect, useMemo, useRef } from 'react';
import Stage from './components/Stage.tsx';
import Display from './components/Display.tsx';
import StartButton from './components/StartButton.tsx';
import ControlsInfo from './components/ControlsInfo.tsx';
import GameStartScreen from './components/GameStartScreen.tsx';
import PauseScreen from './components/PauseScreen.tsx';
import { STAGE, PLAYER } from './types.ts';
import { createStage, checkCollision, randomTetromino, STAGE_WIDTH } from './services/gameHelpers.ts';

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
    const [gameOver, setGameOver] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [dropTime, setDropTime] = useState<number | null>(null);
    const [isClearingLines, setIsClearingLines] = useState(false);

    const linePoints = useMemo(() => [40, 100, 300, 1200], []);

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
        setIsPaused(false);
        setIsClearingLines(false);
    }, [resetPlayer]);
    
    const handleFirstStart = useCallback(() => {
        setGameStarted(true);
        startGame();
    }, [startGame]);

    const togglePause = useCallback(() => {
        if (gameOver || !gameStarted || isClearingLines) return;

        setIsPaused(prev => !prev);
    }, [gameOver, gameStarted, isClearingLines]);

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

            while (checkCollision(playerClone, stage, { x: 0, y: 0 })) {
                playerClone.pos.x += playerClone.pos.x > STAGE_WIDTH / 2 ? -1 : 1;
                if (Math.abs(playerClone.pos.x - prev.pos.x) > playerClone.tetromino[0].length) {
                    return prev;
                }
            }
            return playerClone;
        });
    }, [stage]);

    const drop = useCallback(() => {
        if (rows > (level + 1) * 10) {
            setLevel(prev => prev + 1);
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
            if (y - prev.pos.y < 1) { 
                if(prev.pos.y < 1) setGameOver(true);
                return { ...prev, collided: true };
            }
            return { ...prev, pos: { ...prev.pos, y }, collided: true };
        });
    }, [stage]);

    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (!gameStarted || gameOver) return;

        if (event.key === 'Enter') {
            event.preventDefault();
            togglePause();
            return;
        }

        if (isPaused || isClearingLines) return;

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
            event.preventDefault();
            hardDropPlayer();
        }
    }, [gameOver, gameStarted, isPaused, togglePause, movePlayer, dropPlayer, rotatePlayer, hardDropPlayer, isClearingLines]);
    
    const displayStage = useMemo(() => {
        const newStage = JSON.parse(JSON.stringify(stage));
        if (!gameOver && !isClearingLines) {
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
    }, [player, stage, gameOver, isClearingLines]);
    
    useEffect(() => {
        if (isClearingLines || !player.collided) {
            return;
        }

        const newStage: STAGE = JSON.parse(JSON.stringify(stage));
        player.tetromino.forEach((row, y) => {
            row.forEach((value, x) => {
                if (value !== 0) {
                    const stageY = y + player.pos.y;
                    const stageX = x + player.pos.x;
                    if (newStage[stageY]?.[stageX]) {
                        newStage[stageY][stageX] = [value, 'merged'];
                    }
                }
            });
        });

        const rowsToClear: number[] = [];
        newStage.forEach((row, y) => {
            if (row.every(cell => cell[0] !== 0 && cell[1] === 'merged')) {
                rowsToClear.push(y);
            }
        });

        if (rowsToClear.length > 0) {
            setIsClearingLines(true);
            setDropTime(null);

            const dissolvingStage = newStage.map((row, y) => 
                rowsToClear.includes(y) 
                    ? row.map(cell => [cell[0], 'dissolving']) as STAGE[0] 
                    : row
            );
            setStage(dissolvingStage);
            
            setTimeout(() => {
                const clearedStage = newStage.filter((_, y) => !rowsToClear.includes(y));
                const newRows = Array.from({ length: rowsToClear.length }, () => 
                    Array(STAGE_WIDTH).fill([0, 'clear'])
                );
                
                setStage([...newRows, ...clearedStage]);
                setScore(prev => prev + linePoints[rowsToClear.length - 1] * (level + 1));
                setRows(prev => prev + rowsToClear.length);
                resetPlayer();
                setIsClearingLines(false);
            }, 300);
        } else {
            setStage(newStage);
            resetPlayer();
        }
    // The dependency array is intentionally shortened to break the re-render cycle
    // that was prematurely cancelling the line clear animation timer.
    // The effect's logic is guarded by `isClearingLines` and `player.collided`
    // to ensure it runs only at the correct time.
    }, [player, stage, resetPlayer, linePoints, level]);
    
     useEffect(() => {
        if (isPaused) {
            setDropTime(null);
        } else if (!isClearingLines && !gameOver && gameStarted) {
            setDropTime(1000 / (level + 1) + 200);
        }
    }, [isPaused, isClearingLines, gameOver, gameStarted, level]);
    
    useEffect(() => {
      if (!gameOver && dropTime && !isClearingLines && !isPaused) {
          const gameInterval = setInterval(() => {
              drop();
          }, dropTime);
          return () => clearInterval(gameInterval);
      }
    }, [drop, dropTime, gameOver, isClearingLines, isPaused]);

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
                            {!gameStarted ? (
                                <GameStartScreen onStartGame={handleFirstStart} />
                            ) : (
                                <>
                                    {gameOver && (
                                      <div className="absolute z-10 text-center text-slate-900">
                                        <h2 className="text-2xl mb-4 font-bold">Game Over</h2>
                                        <StartButton onClick={startGame} />
                                      </div>
                                    )}
                                    {isPaused && !gameOver && <PauseScreen onResume={togglePause} />}
                                    <div className={`relative w-full h-full ${gameOver || isPaused ? 'opacity-40' : ''}`}>
                                       <Stage stage={displayStage} />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Side: Info & Controls */}
                <div className="w-full max-w-xs lg:max-w-sm flex flex-col items-center gap-4">
                    <div className="text-center w-full relative">
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