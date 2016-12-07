import {
  GraphQLObjectType as ObjectType,
  GraphQLList as List,
  GraphQLString as StringType,
  GraphQLID as ID,
  GraphQLNonNull as NonNull,
  GraphQLUnionType as UnionType,
  GraphQLInt as Int,
} from 'graphql';

const PartyType = new ObjectType({
  name: 'Party',
  fields: {
    id: { type: new NonNull(ID) },
    name: { type: new NonNull(StringType) },
    order: { type: new NonNull(Int) },
    color: { type: StringType }
  },
});

const ResultType = new ObjectType({
  name: 'Result',
  fields: {
    party: { type: PartyType },
    seats: { type: new NonNull(Int) }
  }
});

const TwitterMeta = new ObjectType({
  name: 'TwitterMeta',
  fields: {
    name: { type: StringType },
    content: { type: StringType }
  }
});

const FacebookMeta = new ObjectType({
  name: 'FacebookMeta',
  fields: {
    property: { type: StringType },
    content: { type: StringType }
  }
});

const MetaType = new UnionType({
  name: 'Meta',
  types: [TwitterMeta, FacebookMeta ],
  resolveType:(value)=>{
    if(value['name']){ return TwitterMeta; } else { return FacebookMeta; }
  }
});

const BallotType = new ObjectType({
  name: 'Ballot',
  fields: {
    id: { type: new NonNull(ID) },
    title: { type: new NonNull(StringType) },
    subtitle: { type: new NonNull(StringType) },
    legend_title: { type: new NonNull(StringType) },
    order: { type: new NonNull(Int) },
    content: { type: new NonNull(StringType) },
    results: { type: new List(ResultType) },
    meta: { type: new List(MetaType) }
  }
});

export const BallotsType = new ObjectType({
  name: 'Ballots',
  fields: {
    list:    { type: new List(BallotType) },
    parties: { type: new List(PartyType) }
  }
});

export default BallotsType;
