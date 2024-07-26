import { AnimalProps } from "./animal"

export type MetadataProps = {
    
        totalPages: number,
        totalElements: number,
        pageable: {
          paged: boolean,
          pageNumber: number,
          pageSize: number,
          offset: number,
          sort: {
            sorted: boolean,
            empty: boolean,
            unsorted: boolean
          },
          unpaged: boolean
        },
        size: number,
        content: [
          AnimalProps
        ],
        number: number,
        sort: {
          sorted: boolean,
          empty: boolean,
          unsorted: boolean
        },
        first: boolean,
        last: boolean,
        numberOfElements: number,
        empty: boolean
      }
