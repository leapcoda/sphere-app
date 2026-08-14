import { shallowRef, type ShallowRef } from 'vue';

const suggestions: ShallowRef<string[]> = shallowRef([]);

export function useSuggestions() {
  function setSuggestions(list: string[]) {
    suggestions.value = list;
  }
  return { suggestions, setSuggestions };
}