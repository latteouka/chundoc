# [peer] Peer.js

## 關閉 Webcam、麥克風

從 localStream 中取出 video 或 audio 的頻道，並且設定 enabled 的值。

要注意`.muted()`不是用來設值的，會回傳 enabled 的狀態。

```typescript
const toggleCamera = async () => {
  const videoTracks = localStream.getVideoTracks();
  console.log(videoTracks);
  if (videoTracks[0]!.enabled) {
    videoTracks[0]!.enabled = false;
  } else {
    videoTracks[0]!.enabled = true;
  }
};

const toggleMic = async () => {
  const audioTracks = localStream.getAudioTracks();
  console.log(audioTracks);
  if (audioTracks[0]!.enabled) {
    audioTracks[0]!.enabled = false;
  } else {
    audioTracks[0]!.enabled = true;
  }
};
```

## Share screen

用`navigator.mediaDevices.getDisplayMedia()`取得新的 MediaStream 後，將 localStream 的 videotrack 替換掉，此時本地端會看到畫面成功變成螢幕分享畫面，但仍需要取代每個 connection 中使用的 track。

connection 的管理，若只是雙人點對點，可以在 call 動作時存下 call，若是多人可以在 addUser, removeUser 時一起與 stream 做保留。

```typescript
// 2 people peer to peer

const shareScreen = async () => {
  if (!sharingScreen) {
    // get screen videotrack
    const displayStream = await navigator.mediaDevices.getDisplayMedia();
    const displayStreamVideoTracks = displayStream.getVideoTracks();
    const localStreamVideoTracks = localStream.getVideoTracks();
    // replace locally
    localStream.removeTrack(localStreamVideoTracks[0]!);
    localStream.addTrack(displayStreamVideoTracks[0]!);
    // replace tracks in connection
    if (callState) {
      callState.peerConnection
        .getSenders()[1]
        ?.replaceTrack(displayStreamVideoTracks[0]!);
    }
    sharingScreen = true;
  } else {
    const userMedia = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const userMediaVideoTracks = userMedia.getVideoTracks();

    const localStreamVideoTracks = localStream.getVideoTracks();
    // replace locally
    localStream.removeTrack(localStreamVideoTracks[0]!);
    localStream.addTrack(userMediaVideoTracks[0]!);
    // replace tracks in connection
    if (callState) {
      callState.peerConnection
        .getSenders()[1]
        ?.replaceTrack(userMediaVideoTracks[0]!);
    }
    sharingScreen = false;
  }
};

// multi users
const shareScreen = async () => {
  if (!sharingScreen) {
    // get screen videotrack
    const displayStream = await navigator.mediaDevices.getDisplayMedia();
    const displayStreamVideoTracks = displayStream.getVideoTracks();
    const localStreamVideoTracks = localStream.getVideoTracks();
    // replace locally
    localStream.removeTrack(localStreamVideoTracks[0]!);
    localStream.addTrack(displayStreamVideoTracks[0]!);
    // replace tracks in connection
    Object.values(peers as PeerState).map((peer) => {
      peer.call.peerConnection
        .getSenders()[1]
        ?.replaceTrack(displayStreamVideoTracks[0]!);
    });
    if (callState) {
      callState.peerConnection
        .getSenders()[1]
        ?.replaceTrack(displayStreamVideoTracks[0]!);
    }
    sharingScreen = true;
  } else {
    const userMedia = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    const userMediaVideoTracks = userMedia.getVideoTracks();

    const localStreamVideoTracks = localStream.getVideoTracks();
    // replace locally
    localStream.removeTrack(localStreamVideoTracks[0]!);
    localStream.addTrack(userMediaVideoTracks[0]!);
    // replace tracks in connection
    console.log(peers);
    Object.values(peers as PeerState).map((peer) => {
      peer.call.peerConnection
        .getSenders()[1]
        ?.replaceTrack(userMediaVideoTracks[0]!);
    });

    if (callState) {
      callState.peerConnection
        .getSenders()[1]
        ?.replaceTrack(userMediaVideoTracks[0]!);
    }
    sharingScreen = false;
  }
};
```
