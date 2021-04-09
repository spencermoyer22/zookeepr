const fs = require('fs');
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require('../lib/zookeepers');
const {zookeepers} = require('../data/zookeepers');
const { start } = require('repl');

jest.mock('fs');

test('creates a zookeeper object', () => {
    const zookeeper = createNewZookeeper(
        { name: 'Spencer', id: "23423"},
        zookeepers
    );

    expect(zookeeper.name).toBe('Spencer');
    expect(zookeeper.id).toBe('23423');
});

test('filters by query', () => {
    const startingZookeepers = [
        {
            id: '1',
            name: 'Spencer',
            age: 23,
            favoriteAnimal: 'tiger'
        },
        {
            id: '2',
            name: 'Emily',
            age: 23,
            favoriteAnimal: 'dog'
        }
    ];

    const updatedZookeepers = filterByQuery({favoriteAnimal: 'tiger'}, startingZookeepers);

    expect(updatedZookeepers.length).toEqual(1);
});

test('finds by id', () => {
    const startingZookeepers = [
        {
            id: '1',
            name: 'Spencer',
            age: 23,
            favoriteAnimal: 'tiger'
        },
        {
            id: '2',
            name: 'Emily',
            age: 23,
            favoriteAnimal: 'dog'
        }
    ];

    const result = findById('2', startingZookeepers);
    expect(result.name).toBe("Emily");
});

test('validates age', () => {
    const validZookeeper = {
        id: '1',
        name: 'Spencer',
        age: 23,
        favoriteAnimal: 'tiger'
    };

    const invalidZookeeper = {
        id: '2',
        name: 'Emily',
        age: '23',
        favoriteAnimal: 'dog'
    }

    const result = validateZookeeper(validZookeeper);
    const result2 = validateZookeeper(invalidZookeeper);

    expect(result).toBe(true);
    expect(result2).toBe(false);
});