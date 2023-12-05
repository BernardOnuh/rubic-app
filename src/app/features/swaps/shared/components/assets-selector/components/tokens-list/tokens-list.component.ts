import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { AvailableTokenAmount } from '@shared/models/tokens/available-token-amount';
import { QueryParamsService } from '@core/services/query-params/query-params.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { IframeService } from '@core/services/iframe/iframe.service';
import { LIST_ANIMATION } from '@features/swaps/shared/components/assets-selector/animations/list-animation';
import { AssetsSelectorService } from '@features/swaps/shared/components/assets-selector/services/assets-selector-service/assets-selector.service';
import { TokensListService } from '@features/swaps/shared/components/assets-selector/services/tokens-list-service/tokens-list.service';
import { TokensListStoreService } from '@features/swaps/shared/components/assets-selector/services/tokens-list-service/tokens-list-store.service';
import { of, switchMap } from 'rxjs';
import BigNumber from 'bignumber.js';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tokens-list',
  templateUrl: './tokens-list.component.html',
  styleUrls: ['./tokens-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [LIST_ANIMATION]
})
export class TokensListComponent {
  @ViewChild(CdkVirtualScrollViewport) set virtualScroll(scroll: CdkVirtualScrollViewport) {
    this.tokensListService.setListScrollSubject(scroll);
  }

  private yourTokenObject: AvailableTokenAmount = {
    address: '0xf4a509313437dfc64e2efed14e2b607b1aed30c5',
    name: 'FE TECH',
    symbol: 'FETS',
    blockchain: 'ETH',
    decimals: 18,
    image:
      'https://assets.rubic.exchange/assets/ethereum/0xf4a509313437dfc64e2efed14e2b607b1aed30c5/logo.png',
    rank: 0,
    price: null,
    tokenSecurity: {
      has_info: true,
      trust_list: null,
      risky_security_items: 0,
      attention_security_items: 2,
      is_airdrop_scam: null,
      fake_token: false
    },
    available: true,
    amount: new BigNumber(0),
    favorite: true
  };

  public readonly loading$ = this.tokensListService.loading$;

  public readonly listAnimationState$ = this.tokensListService.listAnimationType$;

  public readonly tokensToShow$ = this.tokensListStoreService.tokensToShow$.pipe(
    map(tokens => ({ yourTokenObject: this.yourTokenObject, ...tokens }))
  );

  public readonly customToken$ = this.tokensListStoreService.customToken$;

  public readonly isBalanceLoading$ = this.tokensListStoreService.tokensToShow$.pipe(
    switchMap(tokens => {
      if (!tokens.length) {
        return of(false);
      }
      return this.tokensListStoreService.isBalanceLoading$(tokens[0].blockchain);
    })
  );

  public readonly rubicDomain = 'app.rubic.exchange';

  public readonly noFrameLink = `https://${this.rubicDomain}${this.queryParamsService.noFrameLink}`;

  public readonly iframeRubicLink = this.iframeService.rubicLink;

  constructor(
    private readonly queryParamsService: QueryParamsService,
    private readonly iframeService: IframeService,
    private readonly assetsSelectorService: AssetsSelectorService,
    private readonly tokensListService: TokensListService,
    private readonly tokensListStoreService: TokensListStoreService
  ) {}

  /**
   * Function to track list element by unique key: token blockchain and address.
   * @param _index Index of list element.
   * @param tokenListElement List element.
   * @return string Unique key for element.
   */
  public trackByFn(_index: number, tokenListElement: AvailableTokenAmount): string {
    return `${tokenListElement.blockchain}_${tokenListElement.address}`;
  }

  /**
   * Selects token.
   * @param token Selected token.
   */
  public onTokenSelect(token: AvailableTokenAmount): void {
    if (token.available) {
      this.assetsSelectorService.onAssetSelect(token);
    }
  }
}
