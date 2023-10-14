import type { PageServerLoad } from './$types';
import type {Quote} from "$lib/services/api/types/challenges";
import {error} from "@sveltejs/kit";

export const load: PageServerLoad = async (): Promise<{quote: Quote}> => {
    // get a random quote
   const response: Response = await fetch('https://api.quotable.io/random');

   if (!response.ok){
       throw error(response.status, response.statusText);
   }
   // parse the json data
   const quote: Quote = await response.json();

   return {
       quote: quote
   }
};