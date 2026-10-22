/**
 * Rise of Kingdoms Battle Simulator - Core Logic
 * Version 0.2 - Separated from UI
 */

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

/**
 * Returns the damage multiplier based on troop type counter system.
 * Infantry > Cavalry > Archer > Infantry
 */
export function getCounterMultiplier(attackerType, defenderType) {
  if (TROOP_COUNTERS[attackerType] === defenderType) {
    return COUNTER_ADVANTAGE;
  }
  if (TROOP_COUNTERS[defenderType] === attackerType) {
    return COUNTER_DISADVANTAGE;
  }
  return 1.0;
}

/**
 * Calculates approximate troop loss for one attack.
 * Simplified formula based on community reverse-engineering.
 */
export function calculateDamage(
  attackerTroops,
  atkPct,
  defPctDefender,
  hpPctDefender,
  counterMult
) {
  const scale = Math.sqrt(Math.max(attackerTroops, 1000) / 10000);
  const effectiveAtk = 1 + atkPct / 100;
  const effectiveDef = 1 + defPctDefender / 100;
  const effectiveHp = 1 + hpPctDefender / 100;

  const damageFactor = BASE_DAMAGE_FACTOR * scale * (effectiveAtk / effectiveDef) * counterMult;
  const troopLoss = (damageFactor * TROOP_LOSS_CALIBRATION) / effectiveHp;

  return Math.max(0, Math.round(troopLoss));
}

/**
 * Runs the full battle simulation and returns the log + result.
 */
export function simulateBattle(armyA, armyB) {
  let troopsA = armyA.troops;
  let troopsB = armyB.troops;

  const logLines = [];
  logLines.push('Iniciando batalla');
  logLines.push(`A: ${troopsA} ${armyA.type} | ATK ${armyA.atk}% DEF ${armyA.def}% HP ${armyA.hp}%`);
  logLines.push(`B: ${troopsB} ${armyB.type} | ATK ${armyB.atk}% DEF ${armyB.def}% HP ${armyB.hp}%`);
  logLines.push(
    `Counter A→B: x${getCounterMultiplier(armyA.type, armyB.type).toFixed(2)} | B→A: x${getCounterMultiplier(armyB.type, armyA.type).toFixed(2)}`
  );
  logLines.push('');

  let turn = 0;
  while (troopsA > 0 && troopsB > 0 && turn < MAX_TURNS) {
    turn++;

    const multA = getCounterMultiplier(armyA.type, armyB.type);
    const multB = getCounterMultiplier(armyB.type, armyA.type);

    const dmgAtoB = calculateDamage(troopsA, armyA.atk, armyB.def, armyB.hp, multA);
    const dmgBtoA = calculateDamage(troopsB, armyB.atk, armyA.def, armyA.hp, multB);

    troopsB = Math.max(0, troopsB - dmgAtoB);
    troopsA = Math.max(0, troopsA - dmgBtoA);

    logLines.push(
      `Turno ${turn}s: A → B -${dmgAtoB} | B → A -${dmgBtoA} | Restantes A:${troopsA} B:${troopsB}`
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

/**
 * Reads army data from the DOM form.
 */
export function readArmyFromForm(prefix) {
  return {
    type: document.getElementById(`type${prefix}`).value,
    troops: parseInt(document.getElementById(`troops${prefix}`).value) || 0,
    atk: parseFloat(document.getElementById(`atk${prefix}`).value) || 0,
    def: parseFloat(document.getElementById(`def${prefix}`).value) || 0,
    hp: parseFloat(document.getElementById(`hp${prefix}`).value) || 0
  };
}
