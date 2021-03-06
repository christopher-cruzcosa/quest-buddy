import { useHistory, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CharacterEquipment from "../../components/CharacterEquipment/"
import CharacterSpells from "../../components/CharacterSpells"
//import { useAuth } from "../../util/authContext";
import API from "../../util/API";
import "./style.css";


function CharacterPage() {
    const { id } = useParams();
    const history = useHistory();
    //const { user } = useAuth();

    const [characterData, setCharacterData] = useState({});
    const [counter, setCounter] = useState(0);
    const [items, setItems] = useState([]);
    const [spells, setSpells] = useState([]);
    const [characterEquipment, setCharacterEquipment] = useState([]);
    const [characterSpells, setCharacterSpells] = useState([]);

    let equipmentToAdd;
    let spellToAdd;

    const up = (event) => {
        const currentVar = parseInt(event.target.previousElementSibling.textContent)
        const input = event.target.previousElementSibling.id;
        const upVar = currentVar + 1;
        event.target.previousElementSibling.textContent = upVar;
        saveCharacter(input, 1)
    }

    const down = (event) => {
        const currentVar = parseInt(event.target.nextElementSibling.textContent)
        const input = event.target.nextElementSibling.id;
        const downVar = currentVar - 1;
        event.target.nextElementSibling.textContent = downVar;
        saveCharacter(input, -1)
    }

    const addItem = (event) => {
        let item = event.target.previousElementSibling.value;
        item = item.replace(/[.,\/#!$%\^&\*;:{}=\-_`'~()]/g,"").replace(/ /g, "-").toLowerCase();
        API.getOneEquipment(item).then(results => {
            equipmentToAdd = results.data
        }).then(()=>{
            API.addEquipment(characterData._id, equipmentToAdd);
            window.location.reload(false);
        })
    }

    const addSpell = (event) => {
        let spell = event.target.previousElementSibling.value;
        spell = spell.replace(/[.,\#!$%\^&\*;:{}=\-_`'~()]/g,"").replace(/[\/ ]/g, "-").toLowerCase();
        API.getOneSpell(spell).then(results => {
            spellToAdd = results.data
        }).then(() => {
            API.addSpell(characterData._id, spellToAdd);
            window.location.reload(false);
        })
    }

    async function saveCharacter(stat, num) {
        switch (stat) {
            case "level":
                setCharacterData({ ...characterData, level: characterData.level + num })
                break;
            case "currentHP":
                setCharacterData({ ...characterData, currentHP: characterData.currentHP + num })
                break;
            case "maxHP":
                setCharacterData({ ...characterData, maxHP: characterData.maxHP + num })
                break;
            case "strength":
                setCharacterData({ ...characterData, strength: characterData.strength + num })
                break;
            case "dexterity":
                setCharacterData({ ...characterData, dexterity: characterData.dexterity + num })
                break;
            case "constitution":
                setCharacterData({ ...characterData, constitution: characterData.constitution + num })
                break;
            case "intelligence":
                setCharacterData({ ...characterData, intelligence: characterData.intelligence + num })
                break;
            case "wisdom":
                setCharacterData({ ...characterData, wisdom: characterData.wisdom + num })
                break;
            case "charisma":
                setCharacterData({ ...characterData, charisma: characterData.charisma + num })
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        API.getOneCharacter(id).then(results => {
            setCharacterData(results.data);
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        API.getOneCharacter(id).then(results => {
            setCharacterEquipment(results.data.equipment)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        API.getOneCharacter(id).then(results => {
            setCharacterSpells(results.data.spells)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        API.getEquipment().then(equipment => {
            setItems(equipment.data.results)
        }).catch(err => {
            console.log(err);
        })
    }, [])

    useEffect(() => {
        API.getSpells().then(spellList => {
            setSpells(spellList.data.results)
        }).catch(err => {
            console.log(err)
        })
    }, []);
    
// console.log(characterSpells)
    useEffect(() => {
        if (counter !== 0) {
            API.updateCharacter(characterData);
        } else {
            setCounter(counter + 1);
        }
    }, [characterData])
    
    return (
        <main className="container">
            <h3 className="mt-5 mb-4 text-center">{characterData.name}</h3>
            <h4 className="mt-3 mb-4 text-center">{characterData.system}</h4>
            <div className="row">
                <div className="col">
                    <div className="row mt-2">
                        <div className="col-md-6 overflow-auto border" style={{ height: "40em" }}>
                            <p className="mt-2"></p>
                            <h5>Race: {characterData.race}</h5>
                            <h5>Class: {characterData.class}</h5>
                            <h5>Level:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="level" className="quantity">{characterData.level}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h5>
                            <br />
                            <div className="row">
                                <div className="col">
                                    <h6>Current HP:
                            <div className="def-number-input number-input safari_only">
                                            <button onClick={down}
                                                className="minus"></button>
                                            <p id="currentHP" className="quantity">{characterData.currentHP}</p>
                                            <button onClick={up}
                                                className="plus"></button>
                                        </div>
                                    </h6>
                                </div>
                                <div className="col">
                                    <h6>Max HP:
                            <div className="def-number-input number-input safari_only">
                                            <button onClick={down}
                                                className="minus"></button>
                                            <p id="maxHP" className="quantity">{characterData.maxHP}</p>
                                            <button onClick={up}
                                                className="plus"></button>
                                        </div>
                                    </h6>
                                </div>
                            </div>
                            <br />
                            <h5>Stats</h5>
                            <h6>Strength:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="strength" className="quantity">{characterData.strength}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h6>
                            <h6>Dexterity:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="dexterity" className="quantity">{characterData.dexterity}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h6>
                            <h6>Constitution:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="constitution" className="quantity">{characterData.constitution}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h6>
                            <h6>Intelligence:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="intelligence" className="quantity">{characterData.intelligence}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h6>
                            <h6>Widsom:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="wisdom" className="quantity">{characterData.wisdom}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h6>
                            <h6>Charisma:
                            <div className="def-number-input number-input safari_only">
                                    <button onClick={down}
                                        className="minus"></button>
                                    <p id="charisma" className="quantity">{characterData.charisma}</p>
                                    <button onClick={up}
                                        className="plus"></button>
                                </div>
                            </h6>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group container">
                                <h3 className="text-center">Equipment</h3>
                                <label htmlFor="equipment-add">Add equipment</label>
                                <select className="form-control" id="equipment-add">
                                    {items.map(item => {
                                        return <option key={item.index}>{item.name}</option>
                                    })}
                                </select>
                                <button className="mt-3 btn btn-info" onClick={addItem}>Add item</button>
                            </div>
                            <div className="row">
                                <div className="equipment col overflow-auto border" style={{ height: "20em" }}>
                                    {characterEquipment.map((item, index) => {
                                        return <CharacterEquipment key={index} equipment = {item} />
                                    })}
                                </div>
                            </div>
                            <div className="form-group container">
                                <h3 className="text-center">Spells</h3>
                                <label htmlFor="spell-add">Add Spells</label>
                                <select className="form-control" id="equipment-add">
                                    {spells.map(spell => {
                                        return <option key={spell.index}>{spell.name}</option>
                                    })}
                                </select>
                                <button className="mt-3 btn btn-info" onClick={addSpell}>Add Spell</button>
                            </div>

                            
                            <div className="row">
                                
                                <div className="col overflow-auto border" style={{ height: "20em" }}>
                                    {characterSpells.map((spell, index) => {
                                        return <CharacterSpells key={index} spell={spell}/> 
                                        })}
                                    {/* <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Acid Arrow</h5>
                                            <p className="card-text">A shimmering green arrow streaks toward a target within
                                            range and bursts in a spray of acid. Make a ranged spell attack against the
                                            target. On a hit, the target takes 4d4 acid damage immediately and 2d4 acid
                                            damage at the end of its next turn. On a miss, the arrow splashes the target
                                            with acid for half as much of the initial damage and no damage at the end of
                                            its next turn.
                                        </p>
                                            <p className="card-text">Evocation
                                        </p>
                                        </div>
                                    </div>
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Produce Flame</h5>
                                            <p className="card-text">"A flickering flame appears in your hand. The flame remains
                                            there for the duration and harms neither you nor your equipment. The flame
                                            sheds bright light in a 10-foot radius and dim light for an additional 10
                                            feet. The spell ends if you dismiss it as an action or if you cast it
                                            again.",
                                            "You can also attack with the flame, although doing so ends the spell. When
                                            you cast this spell, or as an action on a later turn, you can hurl the flame
                                            at a creature within 30 feet of you. Make a ranged spell attack. On a hit,
                                            the target takes 1d8 fire damage.",
                                            "This spell's damage increases by 1d8 when you reach 5th level (2d8), 11th
                                            level (3d8), and 17th level (4d8)."
                                        </p>
                                            <p className="card-text">Conjuration
                                        </p>
                                        </div>
                                    </div> */}

                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </main>
    );
}

export default CharacterPage;