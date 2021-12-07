pragma solidity ^0.5.0;

contract CovidVacPass {
    uint public VacPassCount = 0;

    struct Pass
    {
        uint id;
        string content;
    }

    mapping(uint => Pass) public passes;
    constructor() public{

        //Initial passes:
        addPass("cuFm1SVhE+VIUugCcHw+zNf5ou5+4hs4f3QteA97u/Gc/bl5loO6Uq5wb2+5jol/yP0FLeKH/0gh+gPWk4cOcktXpwIALeigL/wUZ9NKAiyVm6f5+BW76voiFP4gR/DNQLVvqFpEk2/pAGFxS4BkTJ68lZks7Zhd76czCDYUILkB0HdvDKocp7zWNAxxL2bgdIGqTsSx4wEkuiPC+dfOPMz7eOR4tUWEg6eccHdVZLryXhMfsz44IzrdC7ziSIZrPxlGZu6++J+/zipsCHBtYKDdleCpHd6hakP8YhUfFjb7FmORRrumvXjtFrUibfulJjb8ZGgO4qcrLSj2/8kXIw==;cb5cKOZSYd2AxYRMO89CnZB4INbeZlKqVbtLBkdKBxJZW/RevPIxoeP8TlEU1XIKqJ9QoQ1BSthA8r+lFS9VweZpG4jsybxevWQEXR3wXrGnFFiML6SIh+7fPqmJkULvWJFzMsKtrP68gHMQGCcz8hn+JTtYrU8F5LVk/0UcQGeGfqx74zddH4BERuHC7m82+/JE0PoDbaBMGr2tAuI7v58TUFV2Zmzl9ysvKk+M6mh9oJThOys9SA+fKgqRPmjb8A7MlitPs3Pp5mwNqxOwfGP9gaUR7sOfLE5L7D85ZNVaWtCOW8lDkW33Z7MK5MedgliM1urdd/T7GExi9TKQAA==;b0i0vV8LG1M6IiHPRVIU2A==;0i63Sxxa53gbfUNgagEmb+spMKbfSafwqOa8nSr6Ri5Xi9FGG8A4uMSRTlU7dgzndYsBCmBTW9uXGPvsMgSswGULL1mpXePQ+1byC76wKvHiVHEtaUXUTut3XIyy9muuCvGEIEqAXSz60L3esSvxIPGsioFX7qT9y06Ak6hBhvdIyxlME9Cjn/ug6yB+4oB6yMFiktkKjXbhuItEJYpf8Q==");
        addPass("6MHbqIWYusaSB+MbGoaFHLtLG34fsyE98CoHTxLSfXOeAZh2P5cV4FA7PbS7anFBUXgAvGgjAZLdzMmO0Gf5FlxzP1jx8KXH8v695rM2G0K1BbVYlYyGNejzc92sJoBrMjjVrWm3vHG8x1zyD9dJZa99TmK6JvXgCt3WauVYjRKQwo8q/IIMsHYSVq4lUxy5CxbPHz1T9cQgKRacHvy/y1hPpNP8fMJHUaytkKNquK5VoH9ikhjmvIFwhI09xviftMgGJ6J4YtS0WLcxRVqrEbVSdmhNne6VziciUs+IDtrzFIqBl/FKRWI4UQfouY2GWsQOD1V4G+VTAv8n0ZYNg==;SQrzw1Ok3qIJo0UYgJvM8fFzqzWmHQxIeVK9kgxLFyRXpx8kkFqPRGpDmn6opJJHCF7adwbwWXLA2msKfeut821zVRJHtFaiFsDwX4gKz1wI8gR+43/tg3ynxHNu6Mst7tSs65NyshppHSVAc6vSGa67+HGsfRSnSuh6Gd72fq1kvgOhBduT4mlMf99R6RiTxehBtgrMAxwhnghzHSZIiV8LBQdDbF+dinRheoNY5SwF7LDUzxQmunPJLegAEuolHtkzdrffg/a2+w+sW3lVzcRsPICkopFURlve4dE5Td2dsEBVCBhDeVCDkayOZj/0TQKdGp1/c0ADOpME1zFgfA==;6q7KxMs59s2ev8P53B4KBg==;8eyzRJR0PLPnM3ozmJ0id/2LCvI5x9hB3SG3t/d+/zv3iO6RxKYBWvTfI8qGSImhhI8JHsMEt0kTV4r53hasooSX4LKSDJDSfnmyEU+2lurAzWsInYugYjEiRXovaYqRlecGdy77uA2/+ka8j2wnhD/k9lxkctQB/JL/7lBqnZFaduRMVC6+l2FBECM31FI+nrm7FcmOpu5dqkEpz4mD+PHm8b/MimYboxO0HtqgZFo58yKJRIp5CNL/Q6XTvHAv");
    }
    function addPass(string memory _pass) public{
        passes[VacPassCount] = Pass(VacPassCount, _pass);
        VacPassCount++;

    }

    function scanForPass(string memory _content) public view returns (bool) {
    for (uint i=0; i<VacPassCount; i++) {
    string memory contentBuffer = passes[i].content;
    if (compareStrings(_content,contentBuffer)) {
    return true;
    }
    }
    return false;
    }


    function compareStrings(string memory a, string memory b) public view returns (bool) {
    return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
}

}
