const FACES = ['♣️', '♦️', '♥️', '♠️']
const VALUES = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']

function randomCard() {
    const face = FACES[Math.floor(Math.random() * FACES.length)]
    const value = VALUES[Math.floor(Math.random() * VALUES.length)]
    return { face, value }
}
