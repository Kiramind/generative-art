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

  it('keeps the second motif positions independent from the first motif density', () => {
    const secondMotif = Util.randomPointCoordinates('Artiste', 20, 1000, 500, 10)

    Util.randomPointCoordinates('Artiste', 10, 1000, 500)
    expect(Util.randomPointCoordinates('Artiste', 20, 1000, 500, 10)).toEqual(secondMotif)

    Util.randomPointCoordinates('Artiste', 75, 1000, 500)
    expect(Util.randomPointCoordinates('Artiste', 20, 1000, 500, 10)).toEqual(secondMotif)
  })

  it('preserves the original default transition between motif layers', () => {
    const originalSequence = Util.randFromSeed('Artiste')
    Array.from({ length: 20 }, () => originalSequence())
    const originalSecondMotif = Array.from({ length: 3 }, () => [
      Util.randomInt(originalSequence, 1000),
      Util.randomInt(originalSequence, 500),
    ])

    expect(Util.randomPointCoordinates('Artiste', 3, 1000, 500, 10)).toEqual(originalSecondMotif)
  })
})
