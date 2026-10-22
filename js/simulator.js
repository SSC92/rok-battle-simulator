/**
 * Rise of Kingdoms Battle Simulator - Core Logic
 * Version 0.3 - Con comandantes KvK1
 */

import { getCommanderById } from './commanders.js';

const TROOP_COUNTERS = {
  infantry: 'cavalry',
  cavalry: 'archer',
  archer: 'infantry'
};

const COUNTER_ADVANTAGE = 1.20;
const COUNTER_DISADVANTAGE = 0.85;
const BASE_DAMAGE_FACTOR = 200;
const TROOP_LOSS_CALIBRATION = 25;
const MAX_TURNS = 90;
const RAGE_PER_TURN = 90;
const RAGE_COST = 1000;

export function getCounterMultiplier(attackerType, defenderType) {
  if (TROOP_COUNTERS[attackerType] === defenderType) return COUNTER_ADVANTAGE;
  if (TROOP_COUNTERS[defenderType] === attackerType) return COUNTER_DISADVANTAGE;
  return 1.0;
}

export function calculateDamage(attackerTroops, atkPct, defPctDefender, hpPctDefender, counterMult, skillMult = 1) {
  const scale = Math.sqrt(Math.max(attackerTroops, 1000) / 10000);
  const effectiveAtk = 1 + atkPct / 100;
  const effectiveDef = 1 + defPctDefender / 100;
  const effectiveHp = 1 + hpPctDefender / 100;

  const damageFactor = BASE_DAMAGE_FACTOR * scale * (effectiveAtk / effectiveDef) * counterMult * skillMult;
  const troopLoss = (damageFactor * TROOP_LOSS_CALIBRATION) / effectiveHp;

  return Math.max(0, Math.round(troopLoss));
}

export function simulateBattle(armyA, armyB) {
  let troopsA = armyA.troops;
  let troopsB = armyB.troops;
  let rageA = 0;
  let rageB = 0;

  const cmdA = getCommanderById(armyA.primaryCommander);
  const cmdB = getCommanderById(armyB.primaryCommander);

  const logLines = [];
  logLines.push('Iniciando batalla');
  logLines.push(`A: ${troopsA} ${armyA.type} | ${cmdA.name} | ATK ${armyA.atk}% DEF ${armyA.def}% HP ${armyA.hp}%`);
  logLines.push(`B: ${troopsB} ${armyB.type} | ${cmdB.name} | ATK ${armyB.atk}% DEF ${armyB.def}% HP ${armyB.hp}%`);
  logLines.push(`Counter A→B: x${getCounterMultiplier(armyA.type, armyB.type).toFixed(2)} | B→A: x${getCounterMultiplier(armyB.type, armyA.type).toFixed(2)}`);
  logLines.push('');

  let turn = 0;
  while (troopsA > 0 && troopsB > 0 && turn < MAX_TURNS) {
    turn++;
    rageA += RAGE_PER_TURN;
    rageB += RAGE_PER_TURN;

    let skillMultA = 1;
    let skillMultB = 1;
    let skillLogA = '';
    let skillLogB = '';

    // Skill activa aproximada
    if (rageA >= RAGE_COST && cmdA.activeDamageFactor > 0) {
      skillMultA = 1 + (cmdA.activeDamageFactor / BASE_DAMAGE_FACTOR) * (1 + cmdA.skillDamageBonus) * 0.15;
      rageA = 0;
      skillLogA = ` [SKILL ${cmdA.name}]`;
    }
    if (rageB >= RAGE_COST && cmdB.activeDamageFactor > 0) {
      skillMultB = 1 + (cmdB.activeDamageFactor / BASE_DAMAGE_FACTOR) * (1 + cmdB.skillDamageBonus) * 0.15;
      rageB = 0;
      skillLogB = ` [SKILL ${cmdB.name}]`;
    }

    const multA = getCounterMultiplier(armyA.type, armyB.type);
    const multB = getCounterMultiplier(armyB.type, armyA.type);

    const dmgAtoB = calculateDamage(troopsA, armyA.atk, armyB.def, armyB.hp, multA, skillMultA);
    const dmgBtoA = calculateDamage(troopsB, armyB.atk, armyA.def, armyA.hp, multB, skillMultB);

    troopsB = Math.max(0, troopsB - dmgAtoB);
    troopsA = Math.max(0, troopsA - dmgBtoA);

    logLines.push(
      `Turno ${turn}s: A → B -${dmgAtoB}${skillLogA} | B → A -${dmgBtoA}${skillLogB} | Restantes A:${troopsA} B:${troopsB}`
    );
  }

  logLines.push('');

  let winnerText = '';
  if (troopsA <= 0 && troopsB <= 0) {
    winnerText = `<span class="winner">Empate después de ${turn} turnos</span>`;
  } else if (troopsA <= 0) {
    winnerText = `<span class="winner">Gana Ejército B después de ${turn} turnos. Tropas restantes: ${troopsB}</span>`;
  } else if (troopsB <= 0) {
    winnerText = `<span class="winner">Gana Ejército A después de ${turn} turnos. Tropas restantes: ${troopsA}</span>`;
  } else {
    winnerText = `Batalla interrumpida a los ${turn}s. Restantes A:${troopsA} B:${troopsB}`;
  }

  return {
    log: logLines.join('\n'),
    winnerHtml: winnerText,
    turns: turn,
    remainingA: troopsA,
    remainingB: troopsB
  };
}

export function readArmyFromForm(prefix) {
  return {
    type: document.getElementById(`type${prefix}`).value,
    troops: parseInt(document.getElementById(`troops${prefix}`).value) || 0,
    atk: parseFloat(document.getElementById(`atk${prefix}`).value) || 0,
    def: parseFloat(document.getElementById(`def${prefix}`).value) || 0,
    hp: parseFloat(document.getElementById(`hp${prefix}`).value) || 0,
    primaryCommander: document.getElementById(`commander${prefix}`).value
  };
}
