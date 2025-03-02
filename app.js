document.getElementById("downloadForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const videoUrl = document.getElementById("videoUrl").value;
    const videoId = extractVideoId(videoUrl);

    if (videoId) {
        fetchVideoDetails(videoId);
    } else {
        alert("Invalid YouTube URL");
    }
});

function extractVideoId(url) {
    const regex = /(?:https?:\/\/(?:www\.)?youtube\.com\/(?:[^\/\n\s]+\/\S+\/|\S+\/\S+\/?|\S+))?(\S+?)(?=[^a-z0-9-]|$)/i;
    const match = url.match(regex);
    return match ? match[1] : null;
}

function fetchVideoDetails(videoId) {
    const apiKey = "YOUR_YOUTUBE_API_KEY"; // Replace with your YouTube API Key
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apiKey}&part=snippet,contentDetails`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.items && data.items.length > 0) {
                const video = data.items[0];
                const title = video.snippet.title;
                const duration = video.contentDetails.duration;
                document.getElementById("downloadLinks").innerHTML = `
                    <h2>${title}</h2>
                    <p>Duration: ${duration}</p>
                    <button onclick="downloadVideo('${videoId}')">Download Video</button>
                    <button onclick="downloadAudio('${videoId}')">Download Audio</button>
                `;
            } else {
                alert("Video not found!");
            }
        })
        .catch(error => console.error("Error fetching video details:", error));
}

function downloadVideo(videoId) {
    const downloadUrl = `https://www.yt-download.org/api/button/videos/${videoId}`;
    window.open(downloadUrl, "_blank");
}

function downloadAudio(videoId) {
    const downloadUrl = `https://www.yt-download.org/api/button/mp3/${videoId}`;
    window.open(downloadUrl, "_blank");
}
