/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/solanadapp.json`.
 */
export type Solanadapp = {
  address: '4BTeVU7EXaDVCvYbZiWLgYinhiR4iJL7hhyRzwdP2au5'
  metadata: {
    name: 'solanadapp'
    version: '0.1.0'
    spec: '0.1.0'
    description: 'Created with Anchor'
  }
  instructions: [
    {
      name: 'close'
      discriminator: [98, 165, 201, 177, 108, 65, 206, 96]
      accounts: [
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'solanadapp'
          writable: true
        },
      ]
      args: []
    },
    {
      name: 'decrement'
      discriminator: [106, 227, 168, 59, 248, 27, 150, 101]
      accounts: [
        {
          name: 'solanadapp'
          writable: true
        },
      ]
      args: []
    },
    {
      name: 'increment'
      discriminator: [11, 18, 104, 9, 104, 174, 59, 33]
      accounts: [
        {
          name: 'solanadapp'
          writable: true
        },
      ]
      args: []
    },
    {
      name: 'initialize'
      discriminator: [175, 175, 109, 31, 13, 152, 155, 237]
      accounts: [
        {
          name: 'payer'
          writable: true
          signer: true
        },
        {
          name: 'solanadapp'
          writable: true
          signer: true
        },
        {
          name: 'systemProgram'
          address: '11111111111111111111111111111111'
        },
      ]
      args: []
    },
    {
      name: 'set'
      discriminator: [198, 51, 53, 241, 116, 29, 126, 194]
      accounts: [
        {
          name: 'solanadapp'
          writable: true
        },
      ]
      args: [
        {
          name: 'value'
          type: 'u8'
        },
      ]
    },
  ]
  accounts: [
    {
      name: 'solanadapp'
      discriminator: [183, 218, 240, 102, 143, 38, 143, 116]
    },
  ]
  types: [
    {
      name: 'solanadapp'
      type: {
        kind: 'struct'
        fields: [
          {
            name: 'count'
            type: 'u8'
          },
        ]
      }
    },
  ]
}
