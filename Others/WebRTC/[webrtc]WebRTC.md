---
sidebar_position: 1
---

# [webrtc] WebRTC

## Standard

WebRTC 已經納入 W3C 標準，幾乎所有瀏覽器都支援其 API，所以沒有使用函式庫的狀況下也能直接呼叫。

```typescript
// cameras and microphones
navigator.mediaDevices.getUserMedia();

// screen
navigator.mediaDevices.getDisplayMedia();
```

呼叫 API 以後，瀏覽器就會挑出你常看到的詢問相機麥克風權限的小視窗，而像是 getDisplayMedia 在 Chrome 中還會有個讓你選擇分享標的的視窗。

而點對點的溝通則透過 RTCPeerConnection。

```typescript
RTCPeerConnection.addTrack();
RTCPeerConnection.addIceCandidate();
RTCPeerConnection.createOffer();
RTCPeerConnection.createAnswer();
```

## create offer/answer

WebRTC 的流程基本上為發起者創造 Offer SDP，而對方需要基於 Offer SDP 建立 Answer SDP 回傳，SDP（Session Description Protocol）為雙方建立點對點連線的依據。

由於電腦在網路上的位置難以確認，亦可能存在於 NAT 後方，透過與 STUN/TRUN Server 要回 Ice candidates，連同 SDP 一起與對方交換，確定連線的位置。

[Basic Project](https://github.com/typeneko/webrtc-basic/blob/main/src/pages/index.tsx)

## 函式庫

看到的教學裡面用的如 Agora、Peerjs 等，都是幫你處理掉 Signaling 的部分，像是 Agora 還能帶入 Channel，表示背後可能還有 Websocket Server 讓你可以利用。當你用 Peerjs 時看似有好多流程都被簡化，那是因為點與點連上之前的 Signaling 部分有他的雲端伺服器在幫你處理。

Peer.js 也提供自行部署的選擇[Peer Server](https://github.com/peers/peerjs-server)。

Peer.js 單純的點對點，就好像所有人都在一個大房間裡面一樣，你要做的就是想辦法讓彼此可以交換電話號碼（peerId），可以自己建一個 Websocket Server 來做搭配，達成 Room 的效果及完成 Signaling 交換資訊。（Peer.js 會幫你處理除了 ID 以外的動作）
