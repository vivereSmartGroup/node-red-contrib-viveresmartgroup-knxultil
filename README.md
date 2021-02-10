
![GitHub Logo](/img/logo.jpg)

# node-red-contrib-viveresmartgroup-knxultil



[![NPM version][npm-version-image]][npm-url]
[![NPM downloads per month][npm-downloads-month-image]][npm-url]
[![NPM downloads total][npm-downloads-total-image]][npm-url]
[![MIT License][license-image]][license-url]
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Facebook][facebook-image]][facebook-url]

<br/>
<br/>

## THIS NODE IS STILL IN BETA

A set of utility nodes to translate messages between KNX, Alexa, Homekit and deConz.
This node allows you to simply translate the output of various other nodes, into the input of other nodes.<br/>
Currently, the node is able to cross-translate messages between:<br/>
- node-red-contrib-knx-ultimate
- node-red-contrib-homekit-bridged
- node-red-contrib-alexa-smart-home
- node-red-contrib-deconz

<br/>
<br/>

## CHANGELOG
* See <a href="https://github.com/vivereSmartGroup/node-red-contrib-viveresmartgroup-knxultil/blob/master/CHANGELOG.md">here the changelog</a>

# KnxUltil NODE

<img src='https://raw.githubusercontent.com/vivereSmartGroup/node-red-contrib-viveresmartgroup-knxultil/master/img/KnxUltil.png' width='60%'>

<br/>
<br/>

<details><summary>CLICK HERE, copy and paste it into your flow</summary>
<code>
[{"id":"b2416b2b.a48478","type":"homekit-service","z":"c517632.67ed5a","isParent":true,"bridge":"ef7aa308.cb9cd","parentService":"","name":"TableDimmedLight","serviceName":"Lightbulb","topic":"","filter":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","characteristicProperties":"{}","x":490,"y":380,"wires":[["fb8bc0e0.ec7d38"]]},{"id":"fb8bc0e0.ec7d38","type":"KnxUltil","z":"c517632.67ed5a","name":"To Alexa","inputpayloadtype":"node-red-contrib-homekit-bridged","outputpayloadtype":"node-red-contrib-alexa-smart-home","devicetype":"brightness","topic":"result","x":680,"y":400,"wires":[["798ffdfa.e3c094"]]},{"id":"392ad139.eb2976","type":"KnxUltil","z":"c517632.67ed5a","name":"To Homekit","inputpayloadtype":"node-red-contrib-knx-ultimate","outputpayloadtype":"node-red-contrib-homekit-bridged","devicetype":"brightness","topic":"result","x":290,"y":400,"wires":[["b2416b2b.a48478"]]},{"id":"e1444271.7aeb18","type":"comment","z":"c517632.67ed5a","name":"Example of multiple conversions: KNX -> Homekit -> Alexa","info":"","x":250,"y":340,"wires":[]},{"id":"798ffdfa.e3c094","type":"alexa-smart-home-v3-state","z":"c517632.67ed5a","conf":"","device":"","x":900,"y":380,"wires":[]},{"id":"2f9b7e94.21daaa","type":"knxUltimate","z":"c517632.67ed5a","server":"b60c0d73.1c02b","topic":"0/1/2","outputtopic":"","dpt":"5.001","initialread":false,"notifyreadrequest":false,"notifyresponse":false,"notifywrite":true,"notifyreadrequestalsorespondtobus":false,"notifyreadrequestalsorespondtobusdefaultvalueifnotinitialized":"0","listenallga":false,"name":"Table Light","outputtype":"write","outputRBE":true,"inputRBE":false,"formatmultiplyvalue":1,"formatnegativevalue":"leave","formatdecimalsvalue":999,"passthrough":"no","x":120,"y":380,"wires":[["392ad139.eb2976"]]},{"id":"ef7aa308.cb9cd","type":"homekit-bridge","bridgeName":"Banana","pinCode":"111-11-122","port":"","allowInsecureRequest":false,"manufacturer":"Default Manufacturer","model":"Default Model","serialNo":"Default Serial Number","customMdnsConfig":false,"mdnsMulticast":true,"mdnsInterface":"","mdnsPort":"","mdnsIp":"","mdnsTtl":"","mdnsLoopback":true,"mdnsReuseAddr":true},{"id":"b60c0d73.1c02b","type":"knxUltimate-config","host":"224.0.23.12","port":"3671","physAddr":"15.15.22","suppressACKRequest":false,"csv":"","KNXEthInterface":"Auto","KNXEthInterfaceManuallyInput":"","statusDisplayLastUpdate":false,"statusDisplayDeviceNameWhenALL":false,"statusDisplayDataPoint":true,"stopETSImportIfNoDatapoint":"stop","loglevel":"error","name":"Multicast","localEchoInTunneling":true,"delaybetweentelegrams":"","delaybetweentelegramsfurtherdelayREAD":""}]
</code>
</details>


[license-image]: https://img.shields.io/badge/license-MIT-blue.svg
[license-url]: https://github.com/vivereSmartGroup/node-red-contrib-viveresmartgroup-knxultil/master/LICENSE
[npm-url]: https://npmjs.org/package/node-red-contrib-viveresmartgroup-knxultil
[npm-version-image]: https://img.shields.io/npm/v/node-red-contrib-viveresmartgroup-knxultil.svg
[npm-downloads-month-image]: https://img.shields.io/npm/dm/node-red-contrib-viveresmartgroup-knxultil.svg
[npm-downloads-total-image]: https://img.shields.io/npm/dt/node-red-contrib-viveresmartgroup-knxultil.svg
[facebook-image]: https://img.shields.io/badge/Visit%20us-Facebook-blue
[facebook-url]: https://www.facebook.com/groups/viveresmart