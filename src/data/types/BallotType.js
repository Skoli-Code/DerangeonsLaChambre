import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLInt as Int,
} from 'graphql';

const ResultType = new ObjectType({
  name: 'Result'
  fields: {
    party: { type: new NonNull(ID) },
    result: { type: new NonNull(Int) }
  }
});

const BallotType = new ObjectType({
  name:'Ballot',
  fields: {
    id: { type: new NonNull(ID) },
    order: { type: new NonNull(Int) },
    content: { type: new NonNull(StringType) },
    results: { type: new NonNull(Array<ResultType>) }
});

const PartyType = new ObjectType({
  name: 'Party',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: new NonNull(StringType) },
    order: { type: new NonNull(Int) }
  }
});

const BallotsType = new ObjectType({
  name:'Ballots',
  fields: {
    ballots: { type: Array<BallotType> },
    parties: { type: Array<PartyType> }
  }
});

export default BallotsType;
