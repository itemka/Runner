import {API, apiTest} from "./API";

describe('testing other server requests', async () => {
    let testToken = 'eb8cdf9e61521369da24ab55f0095f5da870881990d9b75daefef50333178daf';
    let [idOfAddedJog, userId] = ['', ''];
    test('testing of request for send feedback', async () => {
        let bodyMessage = {
            topic_id: 1,
            text: "test message"
        };
        const response = await API.sendFeedback(testToken, bodyMessage);
        expect(response.data.response).toEqual("OK");
    });
    test('testing of request for add jog', async () => {
        let testJog = {
            date: `${new Date()}`,
            time: 20,
            distance: 20
        };
        let responseOfAdd = await API.addNewJog(testToken, testJog);
        idOfAddedJog = responseOfAdd.id;
        userId = responseOfAdd.user_id;
        expect(responseOfAdd.time).toEqual(20);
    });
    test('testing of request for delete jog', async () => {
        let responseOfDelete = await API.deleteJog(testToken, idOfAddedJog, userId);
        expect(responseOfDelete.data.response).toEqual("OK");
    });
});


describe('testing of api tests ', async () => {
    test('testing status of request get', async () => {
        const response = await apiTest.get();
        expect(response.status).toEqual(200);
    });
    test('testing method of request get', async () => {
        const response = await apiTest.get();
        expect(response.config.method).toEqual("get");
    });


    test('testing status of request post', async () => {
        const response = await apiTest.post();
        expect(response.status).toEqual(201);
    });
    test('testing method of request post', async () => {
        const response = await apiTest.post();
        expect(response.config.method).toEqual("post");
    });

    test('testing status of request put', async () => {
        const response = await apiTest.put();
        expect(response.status).toEqual(200);
    });
    test('testing method of request put', async () => {
        const response = await apiTest.put();
        expect(response.config.method).toEqual("put");
    });

    test('testing status of request delete', async () => {
        const response = await apiTest.delete();
        expect(response.status).toEqual(200);
    });
    test('testing method of request delete', async () => {
        const response = await apiTest.delete();
        expect(response.config.method).toEqual("delete");
    });
});