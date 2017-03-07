/**
 * Created by 12072 on 06/03/17.
 */
import superAgent from 'superagent';

export const get = (url) => {
    return new Promise((resolve, reject) => {
        superAgent
            .get(url)
            .end((error, result) => {
                if(error) {
                    reject(error);
                } else {
                    resolve(result.body)
                }
            })
    });
};