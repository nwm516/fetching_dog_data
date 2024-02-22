async function fetchDogFacts() {
    try {
        const dogApiEndpoint = 'https://dogapi.dog/api/v2/groups';
        const response = await fetch(dogApiEndpoint);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
     
        // This checks to see if there is "data" property in the response
        if (Array.isArray(responseData.data) && responseData.data.length > 0) {

            // This iterates over the various dog groups listed within the API
           responseData.data.forEach(group => {
            const groupName = group.attributes.name;
            console.log('Group Name: ', groupName);

            // This compiles a list of the various IDs affiliated with the particular dog group
            if ('breeds' in group.relationships && 'data' in group.relationships.breeds) {
                const breedIds = group.relationships.breeds.data.map(breed => breed.id);
                console.log('Associated Breed IDs: ', breedIds);
            } else {
                console.log('No associated breeds for this group.');
            }
            
            // A divider between the groups for readability
            console.log('~~~');
           });
        } else {
            console.error('Error: Unexpected API response format');
        }
    } catch (error) {
        console.error('Error:', error);
    }
}

fetchDogFacts();