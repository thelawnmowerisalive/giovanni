import { useEffect, useState } from 'react';
import './App.css';
import rocketLogo from './assets/rocket-solid.svg';
import TeamView from './components/TeamView';
import LanguageContext from './LanguageContext';
import Pokedex from './model/Pokedex';
import RocketTrainer from './model/RocketTrainer';
import Trainer from './model/Trainer';
import Battle from './battle/Battle';
import BattleView from './components/BattleView';

function App() {
  const [ready, setReady] = useState(false);
  const [trainer, setTrainer] = useState(undefined);
  const [rocket, setRocket] = useState(undefined);
  const [battle, setBattle] = useState(undefined);

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

    setTrainer(new Trainer("Trainer", 42));
    const giovanni = new RocketTrainer("Giovanni", 42, 1.15);
    ["PERSIAN", "KINGDRA", "CRESSELIA"].forEach(name => {
      giovanni.team.push(giovanni.train(Pokedex.INSTANCE.pokemon[name]));
    });
    setRocket(giovanni);
    console.log(giovanni);
  }, [ready]);

  const simulate = () => {
    const battle = new Battle(trainer, rocket).simulate();
    console.log(battle);
    setBattle(battle);
  }

  return (
    <LanguageContext.Provider value='English'>
      <div>
        <img src={rocketLogo} className="logo" alt="Rocket logo" />
      </div>
      {
        ready && trainer && rocket &&
        <>
          <TeamView trainer={trainer}></TeamView>
          <TeamView trainer={rocket} rocket={true}></TeamView>

          <button id="battle" onClick={simulate}>
            BATTLE
          </button>

          {battle && <BattleView battle={battle} />}
        </>
      }
    </LanguageContext.Provider>
  )
}

export default App;
