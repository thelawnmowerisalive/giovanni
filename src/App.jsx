import { useEffect, useState } from 'react';
import './App.css';
import rocketLogo from './assets/rocket-solid.svg';
import Battle from './battle/Battle';
import BattleView from './components/BattleView';
import TeamView from './components/TeamView';
import LanguageContext from './LanguageContext';
import Pokedex from './model/Pokedex';
import RocketTrainer from './model/RocketTrainer';
import Trainer from './model/Trainer';
import PokemonStorage from './PokemonStorage';

function App() {
  const [ready, setReady] = useState(Pokedex.INSTANCE.ready);

  const [trainer, setTrainer] = useState();
  const [rocket, setRocket] = useState();
  const [battle, setBattle] = useState();
  const [turn, setTurn] = useState();

  /**
   * Initialize the pokedex on first render.
   */
  useEffect(() => {
    const initialize = async () => {
      await Pokedex.initialize();
      setReady(Pokedex.INSTANCE.ready);
    }
    initialize();
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    // initialize the trainer with pokemon from cache (if any)
    const trainer = new Trainer("Trainer", 42);
    PokemonStorage.team?.forEach(name => {
      trainer.team.push(PokemonStorage.get(name));
    });
    setTrainer(trainer);

    const giovanni = new RocketTrainer("Giovanni", 42, 1.15);
    ["PERSIAN", "KINGDRA", "CRESSELIA"].forEach(name => {
      giovanni.team.push(giovanni.train(Pokedex.INSTANCE.pokemon[name]));
    });
    setRocket(giovanni);

    console.log(trainer);
    console.log(giovanni);
  }, [ready]);

  const simulate = () => {
    const battle = new Battle(trainer, rocket).simulate();
    console.log(battle);
    setBattle(battle);
  }

  return (
    <LanguageContext.Provider value='English'>
      <div className="main">
        <div>
          <img src={rocketLogo} className="logo" alt="Rocket logo" />
        </div>
        {
          ready && trainer && rocket &&
          <>
            <TeamView trainer={trainer} status={turn?.left}></TeamView>
            <TeamView trainer={rocket} status={turn?.right}></TeamView>

            <button id="battle" onClick={simulate}>
              BATTLE
            </button>
          </>
        }
      </div>
      {battle && <BattleView battle={battle} onSelectTurn={setTurn} />}

    </LanguageContext.Provider>
  )
}

export default App;
