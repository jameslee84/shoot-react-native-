// shoot
// Copyright (C) 2018-2020  James Lee

// shoot is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// shoot is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with shoot.  If not, see <http://www.gnu.org/licenses/>.

import { CreateHistoryItemInput } from '@shootismoke/graphql';
import { gql } from 'apollo-boost';
import * as A from 'fp-ts/lib/Array';
import * as C from 'fp-ts/lib/Console';
import { pipe } from 'fp-ts/lib/pipeable';
import * as TE from 'fp-ts/lib/TaskEither';

import { client } from '../../util/apollo';
import { promiseToTE, sideEffect } from '../../util/fp';
import { noop } from '../../util/noop';
import { Api } from '../api';
import { getOrCreateUser } from './getOrCreateUser';

const CREATE_HISTORY_ITEM = gql`
  mutation createHistoryItem($input: CreateHistoryItemInput!) {
    createHistoryItem(input: $input)
  }
`;

/**
 * Get or create a user
 */
export function createHistoryItem(api: Api): TE.TaskEither<Error, void> {
  return pipe(
    getOrCreateUser(),
    TE.map<string, CreateHistoryItemInput[]>(userId =>
      api.normalized.map(measurement => ({
        measurement,
        userId
      }))
    ),
    TE.chain(
      sideEffect(input =>
        TE.rightIO(C.log(`<createHistoryItem> - ${JSON.stringify(input)}`))
      )
    ),
    TE.chain(inputs =>
      A.array.sequence(TE.taskEither)(
        inputs.map(input =>
          promiseToTE(async () => {
            await client.mutate({
              mutation: CREATE_HISTORY_ITEM,
              variables: { input }
            });
          })
        )
      )
    ),
    TE.map(noop) // Just to return type void
  );
}
