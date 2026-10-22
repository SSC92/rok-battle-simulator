/**
 * Rise of Kingdoms - KvK1 Commanders
 * Seleccionados de la lista disponible en Season 1 (Lost Kingdom)
 * Damage Factor aproximado del active skill a nivel 5 (expertise cuando aplica)
 */

export const KVK1_COMMANDERS = [
  // Legendarios principales
  {
    id: 'ysg',
    name: 'Yi Seong-Gye (YSG)',
    rarity: 'Legendary',
    troopType: 'archer',
    activeDamageFactor: 1700, // Arrow Storm (expertise)
    skillDamageBonus: 0.50,   // Destiny
    notes: 'Mejor AoE de KvK1. Circular 5 targets.'
  },
  {
    id: 'charles',
    name: 'Charles Martel',
    rarity: 'Legendary',
    troopType: 'infantry',
    activeDamageFactor: 1200, // Shield of Francia (escudo + dmg bonus)
    skillDamageBonus: 0,
    notes: 'Tanque con escudo. Ideal primary con Sun Tzu o YSG.'
  },
  {
    id: 'richard',
    name: 'Richard I',
    rarity: 'Legendary',
    troopType: 'infantry',
    activeDamageFactor: 0, // Healing focused
    skillDamageBonus: 0,
    notes: 'Sustain y healing. Muy usado en garrison y open field temprano.'
  },
  {
    id: 'minamoto',
    name: 'Minamoto no Yoshitsune',
    rarity: 'Legendary',
    troopType: 'cavalry',
    activeDamageFactor: 1400,
    skillDamageBonus: 0.30,
    notes: 'Nuke de caballería. Popular con Cao Cao o YSG.'
  },
  {
    id: 'caocao',
    name: 'Cao Cao',
    rarity: 'Legendary',
    troopType: 'cavalry',
    activeDamageFactor: 1000,
    skillDamageBonus: 0.20,
    notes: 'Movilidad y nuke. Clásico pair con Minamoto.'
  },
  {
    id: 'elcid',
    name: 'El Cid',
    rarity: 'Legendary',
    troopType: 'archer',
    activeDamageFactor: 1300,
    skillDamageBonus: 0.25,
    notes: 'Archer nuke. Se usa con YSG en rallies.'
  },
  {
    id: 'aethel',
    name: 'Aethelflaed',
    rarity: 'Legendary',
    troopType: 'leadership',
    activeDamageFactor: 1000,
    skillDamageBonus: 0.15,
    notes: 'Debuffs y AoE. Buena para F2P (Expedition).'
  },
  {
    id: 'mehmed',
    name: 'Mehmed II',
    rarity: 'Legendary',
    troopType: 'leadership',
    activeDamageFactor: 800,
    skillDamageBonus: 0.10,
    notes: 'Support y rally.'
  },
  {
    id: 'hannibal',
    name: 'Hannibal Barca',
    rarity: 'Legendary',
    troopType: 'cavalry',
    activeDamageFactor: 1100,
    skillDamageBonus: 0.20,
    notes: 'Cavalry damage.'
  },
  {
    id: 'frederick',
    name: 'Frederick I',
    rarity: 'Legendary',
    troopType: 'leadership',
    activeDamageFactor: 900,
    skillDamageBonus: 0.15,
    notes: 'Leadership y support.'
  },

  // Epics clave de KvK1
  {
    id: 'suntzu',
    name: 'Sun Tzu',
    rarity: 'Epic',
    troopType: 'infantry',
    activeDamageFactor: 800, // Expertise Art of War (5 targets)
    skillDamageBonus: 0.20,
    notes: 'Mejor epic. AoE + skill damage. Meta F2P.'
  },
  {
    id: 'joan',
    name: 'Joan of Arc',
    rarity: 'Epic',
    troopType: 'leadership',
    activeDamageFactor: 0,
    skillDamageBonus: 0.10,
    notes: 'Support y buffs. Excelente secondary.'
  },
  {
    id: 'baibars',
    name: 'Baibars',
    rarity: 'Epic',
    troopType: 'cavalry',
    activeDamageFactor: 1000,
    skillDamageBonus: 0.15,
    notes: 'Cavalry AoE. Muy usado en KvK1 F2P.'
  },
  {
    id: 'bjorn',
    name: 'Bjorn Ironside',
    rarity: 'Epic',
    troopType: 'infantry',
    activeDamageFactor: 700,
    skillDamageBonus: 0.10,
    notes: 'Infantry con debuff. Pair clásico con Sun Tzu.'
  },
  {
    id: 'belisarius',
    name: 'Belisarius',
    rarity: 'Epic',
    troopType: 'cavalry',
    activeDamageFactor: 600,
    skillDamageBonus: 0.05,
    notes: 'Movilidad y gathering.'
  },
  {
    id: 'hermann',
    name: 'Hermann',
    rarity: 'Epic',
    troopType: 'archer',
    activeDamageFactor: 700,
    skillDamageBonus: 0.10,
    notes: 'Archer garrison y control.'
  },
  {
    id: 'kusunoki',
    name: 'Kusunoki Masashige',
    rarity: 'Epic',
    troopType: 'archer',
    activeDamageFactor: 650,
    skillDamageBonus: 0.10,
    notes: 'Archer defense.'
  },
  {
    id: 'none',
    name: 'Ninguno',
    rarity: '-',
    troopType: 'none',
    activeDamageFactor: 0,
    skillDamageBonus: 0,
    notes: 'Sin comandante'
  }
];

export function getCommanderById(id) {
  return KVK1_COMMANDERS.find(c => c.id === id) || KVK1_COMMANDERS[KVK1_COMMANDERS.length - 1];
}
