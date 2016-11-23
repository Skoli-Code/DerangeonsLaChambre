import {
  GraphQLObjectType as ObjectType,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLInt as Int,
} from 'graphql';

const ResultType = new ObjectType({
  name: 'Result',
  fields: {
    party: { type: new NonNull(ID) },
    seats: { type: new NonNull(Int) }
  }
});

const BallotType = new ObjectType({
  name: 'Ballot',
  fields: {
    id: { type: new NonNull(ID) },
    order: { type: new NonNull(Int) },
    content: { type: new NonNull(StringType) },
    results: { type: new List(ResultType) }
  }
});

const PartyType = new ObjectType({
  name: 'Party',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: new NonNull(StringType) },
    order: { type: new NonNull(Int) },
    color: { type: new NonNull(StringType) }
  },
});

export const BallotsType = new ObjectType({
  name: 'Ballots',
  fields: {
    list:    { type: new List(BallotType) },
    parties: { type: new List(PartyType) }
  }
});

export default BallotsType;
