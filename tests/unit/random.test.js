import { describe, expect, it } from 'vitest'
import Util from '../../src/util/util.js'

describe('seeded generation', () => {
  it('returns the same sequence for the classroom default seed', () => {
    const first = Util.randFromSeed('Artiste')
    const second = Util.randFromSeed('Artiste')

    expect(Array.from({ length: 20 }, () => first())).toEqual(
      Array.from({ length: 20 }, () => second()),
    )
  })

  it('keeps the reference sequence stable', () => {
    const random = Util.randFromSeed('Artiste')

    expect(Array.from({ length: 6 }, () => Util.randomInt(random, 1000))).toEqual([
      228, 329, 218, 575, 406, 521,
    ])
  })

  it('changes the sequence when the protocol seed changes', () => {
    expect(Util.randFromSeed('Artiste')()).not.toBe(Util.randFromSeed('Élève')())
  })
})
