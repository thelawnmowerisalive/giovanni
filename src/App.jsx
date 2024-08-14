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
  const [battle, setBattle] = useState(undefined);

  useEffect(() => {
    const initialize = async () => {
      await Pokedex.initialize();
      setReady(Pokedex.INSTANCE.ready);
    }
    initialize();
  }, []);

  const trainer = new Trainer("Trainer", 42);
  const rocket = new RocketTrainer("Giovanni", 42, 1.15);
  if (ready) {
    ["PERSIAN", "KINGDRA", "CRESSELIA"].forEach(name => {
      rocket.team.push(rocket.train(Pokedex.INSTANCE.pokemon[name]));
    });
    console.log(rocket);
  }

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
      {ready &&
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

export default App
