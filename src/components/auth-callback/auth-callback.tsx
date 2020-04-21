import { Component, h, State, Prop } from "@stencil/core";
import { AuthService } from "../../auth/auth";
import { Store, Action } from "@stencil/redux";
import { AuthResult } from "../../models/authresult";
import { updateLogin } from "../../store/actions/auth";
import { loadingController, alertController } from "@ionic/core";

@Component({
  tag: "auth-callback"
})
export class AuthCallback {
  @Prop({ context: "store" }) store: Store;
  private unsubscribe: any;
  @State() auth: AuthResult;
  updateLogin: Action;

  componentWillLoad() {
    const { mapDispatchToProps, mapStateToProps } = this.store;

    this.unsubscribe = mapStateToProps(this, (state: any) => {
      return {
        auth: state.auth,
      };
    });

    mapDispatchToProps(this, {
      updateLogin,
    });
  }

  componentDidUnload() {
    if (typeof this.unsubscribe === "function") {
      this.unsubscribe();
    }
  }

  async presentLoadingWithOptions() {
    const loading = await loadingController.create({
      spinner: "lines",
      duration: 2000,
      message: "Authenticating...",
      translucent: true,
      cssClass: "custom-class custom-loading"
    });
    return loading.present();
  }

  async presentAlertVerify() {
    const alert = await alertController.create({
      header: 'Bekræft venligst din email',
      message: 'Du har modtaget en mail fra Virego, hvor du bedes klikke på bekræft.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          AuthService.login();
        }
      }]
    });
    return alert.present();

  }

  async presentAlertUserNotFound() {

    const alert = await alertController.create({
      header: 'Du har forsøgt at logge på',
      subHeader:'Du har desværre ikke adgang.',
      message: 'Hvis din afdeling allerede har adgang, skal du kontakte din nærmeste leder. Ellers skriv til support@sonnenielsen.dk.',
      buttons: [{
        text: 'Ok',
        handler: () => {
          AuthService.login();
        }
      }]
    });
    return alert.present();

  }

  async componentDidLoad() {
    this.presentLoadingWithOptions();
    if (/error/.test(location.hash)) {
      this.presentAlertVerify();
    } else if (/access_token|id_token/.test(location.hash)) {
      setTimeout(async () => {
        await AuthService.handleAuthentication();
        const session = AuthService.getSession();
        this.updateLogin(session);
        (document.querySelector("ion-router") as HTMLIonRouterElement).push(
          "/"
        );
      }, 2000);
    } else AuthService.login();
  }

  render() {
    return (
      <ion-content>
      </ion-content>
    );
  }
}
