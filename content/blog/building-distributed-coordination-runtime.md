---
external: false
title: "building distributed coordination runtime"
description: "notes on a small coordination daemon"
date: 2026-09-12
---

[Clusdr](https://clusdr.io) is a daemon for a handful of coordination answers: who's in the cluster, who's the leader, who's still up, what changed. Membership, leadership, presence, watch, locks, leases. That's the surface.

The important split is who joins the cluster:

```diagram
Application :: SDK · localhost → clusdr daemon :: this host → Cluster :: 3 voters · quorum
```

The app never becomes a Raft member. It talks to a daemon on the same machine — same idea as a local Docker engine. That daemon is the cluster member. Daemons keep membership, elect a leader, grant locks and leases.

I didn't add a KV store, an event bus, or messaging. Not because those are bad ideas. Because each one is another thing to operate, and I only wanted the coordination path.

## presence vs leave

These are easy to smash together and then regret.

If a missed heartbeat deletes the member id, a restart looks like a brand new node. Quorum gets weird. You can't tell "this process died" from "this process left on purpose." Clusdr keeps them separate: dead is presence; leave is intentional. That forced an API pass I would have preferred to skip. Worth it.

## "local" on Kubernetes

Local is obvious on a laptop. On Kubernetes it isn't.

`127.0.0.1` inside a pod is not the same as a DaemonSet on the node. Scaling the app is not the same as scaling Raft. If you point the SDK at a Service IP, you're in a different model — closer to how you'd use Consul than how you'd use a sidecared daemon.

I wrote those cases down in the docs so I wouldn't have to rediscover them every time someone (including me) wired it up wrong.

## status

It's v1alpha1. APIs can still move. The bet is just that this stays small enough to feel like a library call, instead of standing up a full consensus product for every service that needs a lock and a member list.

If that's useful, cool. If not, etcd and friends are still there.
