/**
 * Created by Moiz.Kachwala on 15-06-2016.
 */

interface Read<T> {
    retrieve: (query: any, callback: (error: any, result: any)=> void)=> void;
    findById: (id: string, callback: (error:any, result: T) => void) => void;
}

export = Read;