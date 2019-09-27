import { Model } from '../Model';
import { ReactEnt } from '../';
import { get } from '@react-ent/utils';

export class LastUpdated extends Model {
  get initialState() {
    const models = get(ReactEnt, 'config.models', {});
    const objects = Object.values(models);
    let lastUpdated = {};

    for (let i = 0; i < objects.length; i++) {
      const key = Object.keys(objects[i].prototype.initialState)[0].toString();

      // Add to lastUpdated if there is a getUri.
      if (objects[i].prototype.getUri) {
        Object.assign(lastUpdated, { [key]: null });
      }
    }

    return {
      lastUpdated
    };
  }

  get types() {
    return {
      SET_LAST_UPDATED: 'SET_LAST_UPDATED'
    };
  }

  reducer(state, action) {
    switch (action.type) {
      case new LastUpdated().types.SET_LAST_UPDATED:
        return {
          ...state,
          ...action.lastUpdated
        };

      default:
        return state;
    }
  }

  async updateState(lastUpdated, type) {
    return {
      type: new LastUpdated().types.SET_LAST_UPDATED,
      lastUpdated
    };
  }
}