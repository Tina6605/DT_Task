// JSON data for testing (if fetch fails, this will render)
const hardcodedData = {
  tasks: [
    {
      task_id: 1,
      task_title: "Sample Task",
      assets: [
        {
          asset_id: 1,
          asset_title: "Asset 1",
          asset_description: "This is a description for Asset 1.",
          asset_content: "https://www.youtube.com/embed/WkQ52FOXF8c",
        },
        {
          asset_id: 2,
          asset_title: "Asset 2",
          asset_description: "This is a description for Asset 2.",
          asset_content: "./Shree Krishna Govind.mp3",
        },
      ],
    },
  ],
};

// Fetch the JSON file
fetch('https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json')
  .then((response) => {
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return response.json();
  })
  .then((data) => {
    console.log('Fetched Data:', data); // Debugging: Check the fetched data
    if (data.tasks && data.tasks.length > 0) {
      renderTask(data.tasks[0]); // Render the first task from the JSON
    } else {
      console.error('No tasks found in the JSON.');
    }
  })
  .catch((error) => {
    console.error('Fetch failed, using hardcoded data:', error);
    renderTask(hardcodedData.tasks[0]); // Fallback to hardcoded data
  });

// Function to render a single task
function renderTask(task) {
  const taskContainer = document.getElementById('task-container');
  taskContainer.innerHTML = ''; // Clear existing content

  console.log('Rendering Task:', task); // Debugging: Check task data

  // Loop through each asset in the task and render it
  task.assets.forEach((asset) => {
    const assetElement = createAssetContainer(asset);
    taskContainer.appendChild(assetElement);
  });
}

// Function to create a reusable asset container
function createAssetContainer(asset) {
  console.log('Creating Asset Container:', asset); // Debugging: Check asset data

  // Create container div
  const container = document.createElement('div');
  container.className = 'asset-container';

  // Add asset title
  const title = document.createElement('h3');
  title.textContent = asset.asset_title || 'No Title';
  container.appendChild(title);

  // Add asset description
  const description = document.createElement('p');
  description.textContent = asset.asset_description || 'No Description';
  container.appendChild(description);

  // Add asset content (iframe for YouTube or audio for mp3)
  if (asset.asset_content && asset.asset_content.includes('youtube.com')) {
    const iframe = document.createElement('iframe');
    iframe.src = asset.asset_content;
    iframe.allow =
      'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
    iframe.frameBorder = 0;
    container.appendChild(iframe);
  } else if (asset.asset_content && asset.asset_content.endsWith('.mp3')) {
    const audio = document.createElement('audio');
    audio.src = asset.asset_content;
    audio.controls = true;
    container.appendChild(audio);
  }

  return container;
}
