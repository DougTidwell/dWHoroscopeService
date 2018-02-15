# developerWorks horoscope service

## About this project

This code is a companion to the [Intro to Istio video] from the
[developerWorks Mailbag](https://developer.ibm.com/tv/dwmailbag/) series.
You can find the basics of the project here, but the video is your source for complete guidance and
a full explanation of what you'll do here.

This repo contains the code to illustrate two concepts of the Istio service mesh:
**sidecar proxies** and **route rules**. It does this with a horoscope service. There are five different
Docker images, each of which provides a different horoscope. All five implement the same
interface, and the code creates a Kubernetes service that acts as a front-end to the
five Docker containers (or _pods_, in Kubernetes terminology).

When you create the service, you'll use the `istioctl` command to inject _sidecar proxies_
next to all the services and deployments you create. That lets you control access to the
service. At the end, we'll create some _route rules_ that control how traffic is distributed amongst
the five horoscopes.

## Before you get started

There are three things you have to do before you get started:

1. Create a Kubernetes cluster with the IBM Container service.
From the IBM Cloud dashboard, choose Containers in the dropdown menu
in the upper left. A free cluster will work just fine. And the price is right.
(Be aware it may take up to 20 minutes before the cluster is ready.)
2. On the command line, use `bx login` to log in to the IBM Cloud.
3. On the command line, use `bx cs cluster-config Mailbag` to configure
the `kubectl` command. (That assumes your cluster is named `Mailbag`,
of course.)

There's a [developerWorks mailbag video on Kubernetes](https://developer.ibm.com/tv/dw-mailbag-kubernetes-clusters/)
if you need a refresher on these things.

## Installing Istio

To install Istio, visit [istio.io](https://istio.io) and download the latest zip file
or tarball for your platform. Unzip it and go to the `install/kubernetes` directory. Type `kubectl create -f
istio.yaml` to install Istio.

## Installing the sample app

The file `horoscope.yaml` in the root directory of this repo installs all of the code.
The horoscope implementations in the five subdirectories are all packaged as Docker images
in yr author's Dockerhub account, so you don't have to build or upload them yourself.
Run this command to do all the initial setup:

`kubectl create -f <(istioctl kube-inject -f horoscope.yaml)`

The `kube-inject` option of the `istioctl` command modifies the YAML to inject
the sidecar proxies Istio needs to do its work. That creates the services and deployments
your app needs; now you have to define an _ingress_ so Istio will let incoming traffic
reach your service. Use this command:

`kubectl create -f ingress.yaml`

Now you should be able to `curl` to the service...but you have to get the
IP address of the cluster and the randomly-assigned port number for the `istio-ingress` service.
You can get the IP address with the `bx cs workers Mailbag` command. The port number
comes from `kubectl get svc istio-ingress -n istio-system` - look for the port number assigned to
port 80. (Istio installs itself in the namespace `istio-system`, so you
have use `-n` to specify the namespace whenever you're looking for Istio components. )

To `curl` the service, type `curl {ip_address}:{port}/horoscope/gemini` to get the horoscope
for Gemini. If you run this several times with the same sign, you'll get the five different
versions of the horoscope. If you try it with other signs, you'll obviously get other results
as well.

_Note:_ If you use a paid cluster, you get both the IP address and the port
from `kubectl get svc istio-ingress -n istio-system`. A paid cluster has an
external load balancer, so `istio-ingress` has an external IP address.

## Installing the Angular 5 front-end

_Note:_ Yr author is not an Angular expert by any means, so tread with caution here.
Installing Angular can be tedious. ("Whaddya mean `sudo` doesn't have permissions to create a directory???")
[Let me know](mailto:doug_tidwell@us.ibm.com) if you have any problems and I'll do my best to help,
but Stack Overflow is your friend here.

Before you can run the UI, you'll need to change the IP address and port number
in the file `angular-ui/src/app/horoscope-service.ts`. Save the file and (heh)
everything should work.

If you switch to the `angular-ui` directory and type `npm install` followed by `ng serve`,
you should be able to go to [http://localhost:4200](localhost:4200)
to see the app. Note that because of the way Angular applications work, you can
kill `ng serve` once the page loads. All of the interactions between the Angular
app and the horoscope service are handled client-side.

## Using route rules

If you run the command `kubectl create -f route-optimistic-ominous.yaml`, you'll create a
route rule that divides the traffic between the Ominous service and the Optimistic
service, 50% for each. Invoke the service a few times (either via the Angular app or `curl`)
and you'll see the results. The command `kubectl replace -f route-john-swanson.yaml` sends
100% of the traffic to the John Swanson service. You can type `kubectl delete -f routerule horoscope`
to restore the original configuration.
