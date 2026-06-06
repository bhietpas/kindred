plugins {
    id("org.gradle.toolchains.foojay-resolver-convention") version "0.9.0"
}

rootProject.name = "kindred"

dependencyResolutionManagement {
    repositories {
        mavenCentral()
    }
}

include("kindred-domain", "kindred-app")
