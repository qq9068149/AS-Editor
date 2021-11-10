<template>
  <div
    class="listswitching"
    :ref="listSwitchName"
    :style="{ backgroundImage: 'url(' + datas.bgImg + ')' }"
  >
    <!-- 没有视频展示默认 -->
    <!-- 类型一 -->
    <div
      class="more"
      v-show="datas.showMore && datas.commoditylisttype == 0"
      :style="{ 'margin-right': datas.pageMargin + 'px' }"
    >
      更多》
    </div>
    <section
      v-show="!datas.imageList[0] && datas.commoditylisttype === 0"
      :class="[
        datas.commodityType === 5 ? 'defaultcommodityList5' : '',
        datas.commodityType === 1 ? 'defaultcommodityListFlex' : '',
      ]"
      class="defaultcommodity"
      :style="{
        'padding-top': datas.commodityMargin + 'px',
        'padding-left': datas.pageMargin + 'px',
        'padding-right': datas.pageMargin + 'px',
      }"
    >
      <div
        v-for="index in 4"
        :key="index"
        class="defaultcommodityList"
        :class="[
          datas.commodityType === 0 ? 'defaultcommodityList0' : '',
          datas.commodityType === 1 ? 'defaultcommodityList1' : '',
          datas.commodityType === 2 ? 'defaultcommodityList2' : '',
          datas.commodityType === 3 ? 'defaultcommodityList3' : '',
          datas.commodityType === 4 ? 'defaultcommodityList4' : '',
          datas.commodityType === 5 ? 'defaultcommodityList5' : '',
        ]"
        :style="{
          border: datas.moditystyle === 2 ? '1px solid rgba(50,50,51,0.1)' : '',
          'box-shadow':
            datas.moditystyle === 1 ? '0 2px 8px rgba(93,113,127,0.08)' : '',
          margin: datas.commodityMargin + 'px',
          width:
            datas.commodityType === 1
              ? 50 - datas.commodityMargin / 6 + '%'
              : datas.commodityType === 2
              ? 33 - datas.commodityMargin / 5 + '%'
              : datas.commodityType === 4
              ? 50 - datas.commodityMargin / 5 + '%'
              : '',
          'border-radius': datas.borderRadius + 'px',
        }"
      >
        <!-- 视频图片 -->
        <div class="bg-pic">
          <img
            draggable="false"
            src="../../../assets/images/imgs.png"
            alt=""
            :style="{ 'border-radius': datas.borderRadius + 'px' }"
          />
          <!-- 标签 -->
          <van-tag
            mark
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 0"
            >新品</van-tag
          >
          <van-tag
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 1"
            >热<br />卖</van-tag
          >
          <van-tag
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 2"
            >NEW</van-tag
          >
          <van-tag
            plain
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 3"
            >HOT</van-tag
          >
        </div>

        <!-- 文字内容 -->
        <div
          class="text"
          :style="{
            background: datas.moditystyle !== 3 ? '#fff' : 'none',
            'border-top-right-radius': datas.borderRadius + 'px',
            'border-bottom-right-radius': datas.borderRadius + 'px',
          }"
        >
          <!-- 视频名称 -->
          <h5
            :style="{
              'font-weight': datas.textWeight,
              'text-align': datas.positions === 'center' ? 'center' : '',
            }"
          >
            这里显示商品名称，最多显示1行
          </h5>
          <!-- 视频描述 -->
          <p
            :style="{
              'text-align': datas.positions === 'center' ? 'center' : '',
            }"
          >
            这里显示商品描述，最多显示1行
          </p>
          <div class="mony">
            <span v-show="datas.priceofcommodity"><i>￥</i>99</span>
            <div v-show="datas.purchasebutton">
              <van-icon
                name="cart-circle-o"
                size="23"
                v-show="datas.purchasebuttonType === 0"
              />
              <van-icon
                name="add-o"
                size="23"
                v-show="datas.purchasebuttonType === 1"
              />
              <van-icon
                name="add"
                size="23"
                v-show="datas.purchasebuttonType === 2"
              />
              <van-icon
                name="cart-o"
                size="23"
                v-show="datas.purchasebuttonType === 3"
              />
              <em v-show="datas.purchasebuttonType === 4">{{
                datas.purchase
              }}</em>
              <em v-show="datas.purchasebuttonType === 5">{{
                datas.purchase
              }}</em>
              <em v-show="datas.purchasebuttonType === 6">{{
                datas.purchase
              }}</em>
              <em v-show="datas.purchasebuttonType === 7">{{
                datas.purchase
              }}</em>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section
      v-show="datas.imageList[0] && datas.commoditylisttype === 0"
      :class="[
        datas.commodityType === 5 ? 'defaultcommodityList5' : '',
        datas.commodityType === 1 ? 'defaultcommodityListFlex' : '',
      ]"
      class="defaultcommodity"
      :style="{
        'padding-top': datas.commodityMargin + 'px',
        'padding-left': datas.pageMargin + 'px',
        'padding-right': datas.pageMargin + 'px',
      }"
    >
      <div
        v-for="(item, index) in datas.imageList"
        :key="index"
        class="defaultcommodityList"
        :class="[
          datas.commodityType === 0 ? 'defaultcommodityList0' : '',
          datas.commodityType === 1 ? 'defaultcommodityList1' : '',
          datas.commodityType === 2 ? 'defaultcommodityList2' : '',
          datas.commodityType === 3 ? 'defaultcommodityList3' : '',
          datas.commodityType === 4 ? 'defaultcommodityList4' : '',
          datas.commodityType === 5 ? 'defaultcommodityList5' : '',
        ]"
        :style="{
          border: datas.moditystyle === 2 ? '1px solid rgba(50,50,51,0.1)' : '',
          'box-shadow':
            datas.moditystyle === 1 ? '0 2px 8px rgba(93,113,127,0.08)' : '',
          margin: datas.commodityMargin + 'px',
          width:
            datas.commodityType === 1
              ? 50 - datas.commodityMargin / 6 + '%'
              : datas.commodityType === 2
              ? 33 - datas.commodityMargin / 5 + '%'
              : datas.commodityType === 4
              ? 50 - datas.commodityMargin / 5 + '%'
              : '',
          'border-radius': datas.borderRadius + 'px',
        }"
      >
        <!-- 视频图片 -->
        <div class="bg-pic">
          <img
            draggable="false"
            :src="item.coverUrl"
            alt=""
            :style="{ 'border-radius': datas.borderRadius + 'px' }"
          />
          <!-- 标签 -->
          <van-tag
            mark
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 0"
            >新品</van-tag
          >
          <van-tag
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 1"
            >热<br />卖</van-tag
          >
          <van-tag
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 2"
            >NEW</van-tag
          >
          <van-tag
            plain
            :color="datas.commodityTagColor || tagColor"
            :style="styleString"
            class="marks"
            v-show="datas.commoditycorner && datas.commoditycornertype === 3"
            >HOT</van-tag
          >
        </div>

        <!-- 文字内容 -->
        <div
          class="text"
          :style="{
            background: datas.moditystyle !== 3 ? '#fff' : 'none',
            'border-top-right-radius': datas.borderRadius + 'px',
            'border-bottom-right-radius': datas.borderRadius + 'px',
          }"
        >
          <!-- 视频名称 -->
          <h5
            :style="{
              'font-weight': datas.textWeight,
              'text-align': datas.positions === 'center' ? 'center' : '',
            }"
          >
            {{ item.name }}
          </h5>
          <!-- 视频描述 -->
          <p
            :style="{
              'text-align': datas.positions === 'center' ? 'center' : '',
            }"
          >
            {{ item.introduce }}
          </p>
          <div
            class="mony"
            v-if="datas.priceofcommodity || datas.purchasebutton"
          >
            <span v-show="datas.priceofcommodity"
              ><i>￥</i>
              {{ item.price }}
            </span>
            <div v-show="datas.purchasebutton">
              <van-icon
                name="cart-circle-o"
                size="23"
                v-show="datas.purchasebuttonType === 0"
              />
              <van-icon
                name="add-o"
                size="23"
                v-show="datas.purchasebuttonType === 1"
              />
              <van-icon
                name="add"
                size="23"
                v-show="datas.purchasebuttonType === 2"
              />
              <van-icon
                name="cart-o"
                size="23"
                v-show="datas.purchasebuttonType === 3"
              />
              <em v-show="datas.purchasebuttonType === 4">{{
                datas.purchase
              }}</em>
              <em v-show="datas.purchasebuttonType === 5">{{
                datas.purchase
              }}</em>
              <em v-show="datas.purchasebuttonType === 6">{{
                datas.purchase
              }}</em>
              <em v-show="datas.purchasebuttonType === 7">{{
                datas.purchase
              }}</em>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 类型二 -->
    <div class="tab-type2">
      <div
        class="more"
        v-show="datas.showMore && datas.commoditylisttype == 1"
        :style="{
          'margin-right': datas.pageMargin + 'px',
          'margin-top': '0px',
        }"
      >
        更多》
      </div>
      <van-tabs
        v-model="active1"
        v-show="datas.commoditylisttype === 1"
        animated
        swipeable
        :color="datas.tabColor"
      >
        <van-tab
          :name="index"
          :title="item.text"
          v-for="(item, index) in datas.commoditylisttypetab"
          :key="index"
          :style="{
            'font-size': item.wordSize + 'px',
            'font-weight': item.wordWeight,
          }"
        >
          <section
            v-show="!item.imageList[0] && datas.commoditylisttype === 1"
            :class="[datas.commodityType === 5 ? 'defaultcommodityList5' : '']"
            class="defaultcommodity"
            :style="{
              'padding-top': datas.commodityMargin + 'px',
              'padding-left': datas.pageMargin + 'px',
              'padding-right': datas.pageMargin + 'px',
            }"
          >
            <div
              v-for="index in 4"
              :key="index"
              class="defaultcommodityList"
              :class="[
                datas.commodityType === 0 ? 'defaultcommodityList0' : '',
                datas.commodityType === 1 ? 'defaultcommodityList1' : '',
                datas.commodityType === 2 ? 'defaultcommodityList2' : '',
                datas.commodityType === 3 ? 'defaultcommodityList3' : '',
                datas.commodityType === 4 ? 'defaultcommodityList4' : '',
                datas.commodityType === 5 ? 'defaultcommodityList5' : '',
              ]"
              :style="{
                border:
                  datas.moditystyle === 2 ? '1px solid rgba(50,50,51,0.1)' : '',
                'box-shadow':
                  datas.moditystyle === 1
                    ? '0 2px 8px rgba(93,113,127,0.08)'
                    : '',
                margin: datas.commodityMargin + 'px',
                width:
                  datas.commodityType === 1
                    ? 50 - datas.commodityMargin / 6 + '%'
                    : datas.commodityType === 2
                    ? 33 - datas.commodityMargin / 5 + '%'
                    : datas.commodityType === 4
                    ? 50 - datas.commodityMargin / 5 + '%'
                    : '',
                'border-radius': datas.borderRadius + 'px',
              }"
            >
              <!-- 视频图片 -->
              <div class="bg-pic">
                <img
                  draggable="false"
                  src="../../../assets/images/imgs.png"
                  alt=""
                  :style="{ 'border-radius': datas.borderRadius + 'px' }"
                />
                <!-- 标签 -->
                <van-tag
                  mark
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 0
                  "
                  >新品</van-tag
                >
                <van-tag
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 1
                  "
                  >热<br />卖</van-tag
                >
                <van-tag
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 2
                  "
                  >NEW</van-tag
                >
                <van-tag
                  plain
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 3
                  "
                  >HOT</van-tag
                >
              </div>

              <!-- 文字内容 -->
              <div
                class="text"
                :style="{
                  background: datas.moditystyle !== 3 ? '#fff' : 'none',
                  'border-top-right-radius': datas.borderRadius + 'px',
                  'border-bottom-right-radius': datas.borderRadius + 'px',
                }"
              >
                <!-- 视频名称 -->
                <h5
                  :style="{
                    'font-weight': datas.textWeight,
                    'text-align': datas.positions === 'center' ? 'center' : '',
                  }"
                >
                  这里显示商品名称，最多显示1行
                </h5>
                <!-- 视频描述 -->
                <p
                  :style="{
                    'text-align': datas.positions === 'center' ? 'center' : '',
                  }"
                >
                  这里显示商品描述，最多显示1行
                </p>
                <div class="mony">
                  <span v-show="datas.priceofcommodity"><i>￥</i>99</span>
                  <div v-show="datas.purchasebutton">
                    <van-icon
                      name="cart-circle-o"
                      size="23"
                      v-show="datas.purchasebuttonType === 0"
                    />
                    <van-icon
                      name="add-o"
                      size="23"
                      v-show="datas.purchasebuttonType === 1"
                    />
                    <van-icon
                      name="add"
                      size="23"
                      v-show="datas.purchasebuttonType === 2"
                    />
                    <van-icon
                      name="cart-o"
                      size="23"
                      v-show="datas.purchasebuttonType === 3"
                    />
                    <em v-show="datas.purchasebuttonType === 4">{{
                      datas.purchase
                    }}</em>
                    <em v-show="datas.purchasebuttonType === 5">{{
                      datas.purchase
                    }}</em>
                    <em v-show="datas.purchasebuttonType === 6">{{
                      datas.purchase
                    }}</em>
                    <em v-show="datas.purchasebuttonType === 7">{{
                      datas.purchase
                    }}</em>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section
            v-show="item.imageList[0] && datas.commoditylisttype === 1"
            :class="[datas.commodityType === 5 ? 'defaultcommodityList5' : '']"
            class="defaultcommodity"
            :style="{
              'padding-top': datas.commodityMargin + 'px',
              'padding-left': datas.pageMargin + 'px',
              'padding-right': datas.pageMargin + 'px',
            }"
          >
            <div
              v-for="(item, index) in item.imageList"
              :key="index"
              class="defaultcommodityList"
              :class="[
                datas.commodityType === 0 ? 'defaultcommodityList0' : '',
                datas.commodityType === 1 ? 'defaultcommodityList1' : '',
                datas.commodityType === 2 ? 'defaultcommodityList2' : '',
                datas.commodityType === 3 ? 'defaultcommodityList3' : '',
                datas.commodityType === 4 ? 'defaultcommodityList4' : '',
                datas.commodityType === 5 ? 'defaultcommodityList5' : '',
              ]"
              :style="{
                border:
                  datas.moditystyle === 2 ? '1px solid rgba(50,50,51,0.1)' : '',
                'box-shadow':
                  datas.moditystyle === 1
                    ? '0 2px 8px rgba(93,113,127,0.08)'
                    : '',
                margin: datas.commodityMargin + 'px',
                width:
                  datas.commodityType === 1
                    ? 50 - datas.commodityMargin / 6 + '%'
                    : datas.commodityType === 2
                    ? 33 - datas.commodityMargin / 5 + '%'
                    : datas.commodityType === 4
                    ? 50 - datas.commodityMargin / 5 + '%'
                    : '',
                'border-radius': datas.borderRadius + 'px',
              }"
            >
              <!-- 视频图片 -->
              <div class="bg-pic">
                <img
                  draggable="false"
                  :src="item.coverUrl"
                  alt=""
                  :style="{ 'border-radius': datas.borderRadius + 'px' }"
                />
                <!-- 标签 -->
                <van-tag
                  mark
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 0
                  "
                  >新品</van-tag
                >
                <van-tag
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 1
                  "
                  >热<br />卖</van-tag
                >
                <van-tag
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 2
                  "
                  >NEW</van-tag
                >
                <van-tag
                  plain
                  :color="datas.commodityTagColor || tagColor"
                  :style="styleString"
                  class="marks"
                  v-show="
                    datas.commoditycorner && datas.commoditycornertype === 3
                  "
                  >HOT</van-tag
                >
              </div>

              <!-- 文字内容 -->
              <div
                class="text"
                :style="{
                  background: datas.moditystyle !== 3 ? '#fff' : 'none',
                  'border-top-right-radius': datas.borderRadius + 'px',
                  'border-bottom-right-radius': datas.borderRadius + 'px',
                }"
              >
                <!-- 视频名称 -->
                <h5
                  :style="{
                    'font-weight': datas.textWeight,
                    'text-align': datas.positions === 'center' ? 'center' : '',
                  }"
                >
                  {{ item.name }}
                </h5>
                <!-- 视频描述 -->
                <p
                  :style="{
                    'text-align': datas.positions === 'center' ? 'center' : '',
                  }"
                >
                  {{ item.introduce }}
                </p>
                <div
                  class="mony"
                  v-if="datas.priceofcommodity || datas.purchasebutton"
                >
                  <span v-show="datas.priceofcommodity"
                    ><i>￥</i>
                    {{ item.price }}
                  </span>
                  <div v-show="datas.purchasebutton">
                    <van-icon
                      name="cart-circle-o"
                      size="23"
                      v-show="datas.purchasebuttonType === 0"
                    />
                    <van-icon
                      name="add-o"
                      size="23"
                      v-show="datas.purchasebuttonType === 1"
                    />
                    <van-icon
                      name="add"
                      size="23"
                      v-show="datas.purchasebuttonType === 2"
                    />
                    <van-icon
                      name="cart-o"
                      size="23"
                      v-show="datas.purchasebuttonType === 3"
                    />
                    <em v-show="datas.purchasebuttonType === 4">{{
                      datas.purchase
                    }}</em>
                    <em v-show="datas.purchasebuttonType === 5">{{
                      datas.purchase
                    }}</em>
                    <em v-show="datas.purchasebuttonType === 6">{{
                      datas.purchase
                    }}</em>
                    <em v-show="datas.purchasebuttonType === 7">{{
                      datas.purchase
                    }}</em>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </van-tab>
      </van-tabs>
    </div>

    <!-- 类型三 -->

    <div>
      <div
        class="more"
        v-show="datas.showMore && datas.commoditylisttype == 2"
        :style="{
          'margin-right': datas.pageMargin + 'px',
          'margin-top': '0px',
        }"
      >
        更多》
      </div>
      <van-tree-select
        height="auto"
        :items="datas.commoditylisttypetab"
        :main-active-index.sync="active"
        v-show="datas.commoditylisttype === 2"
        class="type3"
        @click-nav="treeSelect"
      >
        <template #content>
          <div v-for="(item, index) in datas.commoditylisttypetab" :key="index">
            <section
              v-if="active === index"
              v-show="!item.imageList[0]"
              class="defaultcommodity"
              :style="{
                'padding-top': datas.commodityMargin + 'px',
                'padding-left': datas.pageMargin + 'px',
                'padding-right': datas.pageMargin + 'px',
              }"
            >
              <div
                v-for="index in 4"
                :key="index"
                class="defaultcommodityList defaultcommodityList3"
                :style="{
                  border:
                    datas.moditystyle === 2
                      ? '1px solid rgba(50,50,51,0.1)'
                      : '',
                  'box-shadow':
                    datas.moditystyle === 1
                      ? '0 2px 8px rgba(93,113,127,0.08)'
                      : '',
                  margin: datas.commodityMargin + 'px',
                  'border-radius': datas.borderRadius + 'px',
                }"
              >
                <!-- 视频图片 -->
                <div class="bg-pic">
                  <img
                    draggable="false"
                    src="../../../assets/images/imgs.png"
                    alt=""
                    :style="{ 'border-radius': datas.borderRadius + 'px' }"
                  />
                  <!-- 标签 -->
                  <van-tag
                    mark
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 0
                    "
                    >新品</van-tag
                  >
                  <van-tag
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 1
                    "
                    >热<br />卖</van-tag
                  >
                  <van-tag
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 2
                    "
                    >NEW</van-tag
                  >
                  <van-tag
                    plain
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 3
                    "
                    >HOT</van-tag
                  >
                </div>

                <!-- 文字内容 -->
                <div
                  class="text"
                  :style="{
                    background: datas.moditystyle !== 3 ? '#fff' : 'none',
                    'border-top-right-radius': datas.borderRadius + 'px',
                    'border-bottom-right-radius': datas.borderRadius + 'px',
                  }"
                >
                  <!-- 视频名称 -->
                  <h5
                    :style="{
                      'font-weight': datas.textWeight,
                      'text-align':
                        datas.positions === 'center' ? 'center' : '',
                    }"
                  >
                    这里显示商品名称，最多显示1行
                  </h5>
                  <!-- 视频描述 -->
                  <p
                    :style="{
                      'text-align':
                        datas.positions === 'center' ? 'center' : '',
                    }"
                  >
                    这里显示商品描述，最多显示1行
                  </p>
                  <div class="mony">
                    <span v-show="datas.priceofcommodity"><i>￥</i>99</span>
                    <div v-show="datas.purchasebutton">
                      <van-icon
                        name="cart-circle-o"
                        size="23"
                        v-show="datas.purchasebuttonType === 0"
                      />
                      <van-icon
                        name="add-o"
                        size="23"
                        v-show="datas.purchasebuttonType === 1"
                      />
                      <van-icon
                        name="add"
                        size="23"
                        v-show="datas.purchasebuttonType === 2"
                      />
                      <van-icon
                        name="cart-o"
                        size="23"
                        v-show="datas.purchasebuttonType === 3"
                      />
                      <em v-show="datas.purchasebuttonType === 4">{{
                        datas.purchase
                      }}</em>
                      <em v-show="datas.purchasebuttonType === 5">{{
                        datas.purchase
                      }}</em>
                      <em v-show="datas.purchasebuttonType === 6">{{
                        datas.purchase
                      }}</em>
                      <em v-show="datas.purchasebuttonType === 7">{{
                        datas.purchase
                      }}</em>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section
              v-if="active === index"
              v-show="item.imageList[0]"
              class="defaultcommodity"
              :style="{
                'padding-top': datas.commodityMargin + 'px',
                'padding-left': datas.pageMargin + 'px',
                'padding-right': datas.pageMargin + 'px',
              }"
            >
              <div
                v-for="(item, index) in item.imageList"
                :key="index"
                class="defaultcommodityList defaultcommodityList3"
                :style="{
                  border:
                    datas.moditystyle === 2
                      ? '1px solid rgba(50,50,51,0.1)'
                      : '',
                  'box-shadow':
                    datas.moditystyle === 1
                      ? '0 2px 8px rgba(93,113,127,0.08)'
                      : '',
                  margin: datas.commodityMargin + 'px',
                  'border-radius': datas.borderRadius + 'px',
                }"
              >
                <!-- 视频图片 -->
                <div class="bg-pic">
                  <img
                    draggable="false"
                    :src="item.coverUrl"
                    alt=""
                    :style="{ 'border-radius': datas.borderRadius + 'px' }"
                  />
                  <!-- 标签 -->
                  <van-tag
                    mark
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 0
                    "
                    >新品</van-tag
                  >
                  <van-tag
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 1
                    "
                    >热<br />卖</van-tag
                  >
                  <van-tag
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 2
                    "
                    >NEW</van-tag
                  >
                  <van-tag
                    plain
                    :color="datas.commodityTagColor || tagColor"
                    :style="styleString"
                    class="marks"
                    v-show="
                      datas.commoditycorner && datas.commoditycornertype === 3
                    "
                    >HOT</van-tag
                  >
                </div>

                <!-- 文字内容 -->
                <div
                  class="text"
                  :style="{
                    background: datas.moditystyle !== 3 ? '#fff' : 'none',
                    'border-top-right-radius': datas.borderRadius + 'px',
                    'border-bottom-right-radius': datas.borderRadius + 'px',
                  }"
                >
                  <!-- 视频名称 -->
                  <h5
                    :style="{
                      'font-weight': datas.textWeight,
                      'text-align':
                        datas.positions === 'center' ? 'center' : '',
                    }"
                  >
                    {{ item.name }}
                  </h5>
                  <!-- 视频描述 -->
                  <p
                    :style="{
                      'text-align':
                        datas.positions === 'center' ? 'center' : '',
                    }"
                  >
                    {{ item.introduce }}
                  </p>
                  <div
                    class="mony"
                    v-if="datas.priceofcommodity || datas.purchasebutton"
                  >
                    <span v-show="datas.priceofcommodity"
                      ><i>￥</i>
                      {{ item.price }}
                    </span>
                    <div v-show="datas.purchasebutton">
                      <van-icon
                        name="cart-circle-o"
                        size="23"
                        v-show="datas.purchasebuttonType === 0"
                      />
                      <van-icon
                        name="add-o"
                        size="23"
                        v-show="datas.purchasebuttonType === 1"
                      />
                      <van-icon
                        name="add"
                        size="23"
                        v-show="datas.purchasebuttonType === 2"
                      />
                      <van-icon
                        name="cart-o"
                        size="23"
                        v-show="datas.purchasebuttonType === 3"
                      />
                      <em v-show="datas.purchasebuttonType === 4">{{
                        datas.purchase
                      }}</em>
                      <em v-show="datas.purchasebuttonType === 5">{{
                        datas.purchase
                      }}</em>
                      <em v-show="datas.purchasebuttonType === 6">{{
                        datas.purchase
                      }}</em>
                      <em v-show="datas.purchasebuttonType === 7">{{
                        datas.purchase
                      }}</em>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </template>
      </van-tree-select>
    </div>

    <!-- 删除组件 -->
    <slot name="deles" />
  </div>
</template>

<script>
export default {
  name: 'listswitching',
  props: {
    datas: Object,
  },
  data() {
    return {
      active1: 0,
      active: 0,
      listSwitchName: null,
      tagColor: '#07c160',
      styleString: {},
    }
  },
  created() {
    console.log(this.datas, '--------------listswitching datas')
  },
  mounted() {
    this.$nextTick(() => {
      if (this.$refs[this.listSwitchName]) {
        this.$refs[this.listSwitchName][0].querySelector(
          '.van-sidebar-item--select'
        ).style.borderColor = this.datas.tabColor
      }

      this.listSwitchName =
        'listswitching' + document.querySelectorAll('.listswitching').length
      this.tagPositionStyle()
    })
  },
  methods: {
    // 这里有个bug  当出现多个商品组件且同为类型3时  点击某一个商品组件会无法匹配 .van-sidebar-item 个数
    treeSelect(index) {
      setTimeout(() => {
        this.$refs[this.listSwitchName]
          .querySelectorAll('.van-sidebar-item')
          .forEach((item, i) => {
            if (i !== index) {
              item.style.borderColor = 'transparent'
            }
          })
        this.$refs[this.listSwitchName].querySelector(
          '.van-sidebar-item--select'
        ).style.borderColor = this.datas.tabColor
      })
    },

    // 处理标记位置
    tagPositionStyle() {
      this.styleString = {
        position: 'absolute',
      }
      // if(!this.datas.tagPosition) {
      //   this.styleString.top = '5px'
      //   this.styleString.left = '0px'
      //   this.datas.commoditycornertype === 0 ?  this.styleString.borderRadius = '10px 0px 0px 10px !important' : ''
      //   return
      // }
      /* '左上',
        '左下',
        '又上',
        '又下' */
      switch (this.datas.tagPosition) {
        case 0: // 左上
          this.styleString.top = '5px'
          this.styleString.left = '0px'
          break
        case 1: // 左下
          this.styleString.bottom = '5px'
          this.styleString.left = '0px'
          break
        case 2: // 右上
          this.styleString.top = '5px'
          this.styleString.right = '0px'
          this.datas.commoditycornertype === 0
            ? (this.styleString.borderRadius = '10px 0px 0px 10px !important')
            : ''
          break
        case 3: // 右下
          this.styleString.bottom = '5px'
          this.styleString.right = '0px'
          this.datas.commoditycornertype === 0
            ? (this.styleString.borderRadius = '10px 0px 0px 10px !important')
            : ''
          break
      }
    },
  },
  watch: {
    'datas.tabColor': function () {
      this.$refs[this.listSwitchName].querySelector(
        '.van-tabs__line'
      ).style.backgroundColor = this.datas.tabColor
      this.$refs[this.listSwitchName].querySelector(
        '.van-sidebar-item--select'
      ).style.borderColor = this.datas.tabColor
    },
    'datas.commoditylisttype': function () {
      if (this.datas.commoditylisttype === 2) {
        this.$refs[this.listSwitchName].querySelector(
          '.van-sidebar-item--select'
        ).style.borderColor = this.datas.tabColor
      }
    },
    'datas.tagPosition': function () {
      this.tagPositionStyle()
    },
    'datas.commoditycornertype': function () {
      this.tagPositionStyle()
    },
  },
}
</script>

<style scoped lang="less">
.listswitching {
  position: relative;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 10px 0;
  .more {
    margin-top: 10px;
    height: 25px;
    line-height: 25px;
    text-align: right;
    font-size: 12px;
    color: #999;
    cursor: pointer;
  }
  /* 默认商品 */
  .defaultcommodity {
    box-sizing: border-box;
    &.defaultcommodityList5 {
      overflow-x: scroll;
      display: flex;
      flex-wrap: nowrap;
      /* 滚动条 */
      &::-webkit-scrollbar {
        height: 1px;
      }
      &::-webkit-scrollbar-thumb {
        background-color: #155bd4;
      }
      /deep/.el-collapse-item__header,
      /deep/.el-collapse-item__wrap {
        border-bottom: 0 !important;
      }
    }
    .bg-pic {
      width: 100%;
      height: 240px;
      position: relative;
    }
    .defaultcommodityList {
      position: relative;
      display: inline-flex;
      flex-direction: column;
      // border: 1px solid #fff;
      &.defaultcommodityList0 {
        width: 100%;
        // height: 340px;
        margin-left: 0 !important;
        margin-right: 0 !important;
        margin-top: 0 !important;
        &:nth-of-type(1) {
          margin-top: 0 !important;
        }
        .bg-pic {
          width: 100%;
          height: 240px;
        }
      }
      &.defaultcommodityList1 {
        // border: none !important;
        margin-top: 0 !important;
        &:nth-of-type(even) {
          margin-left: 0 !important;
          margin-right: 0 !important;
        }
        &:nth-of-type(odd) {
          margin-left: 0 !important;
        }
        .bg-pic {
          width: 100%;
          height: 120px;
        }
      }
      &.defaultcommodityList2 {
        max-width: 33%;
        margin-top: 0 !important;
        margin-left: 0 !important;
        &:nth-of-type(3n) {
          margin-right: 0 !important;
        }
        .text {
          h5 {
            font-size: 12px !important;
          }
          p {
            font-size: 10px !important;
          }
          .mony {
            span {
              font-size: 12px !important;
              i {
                font-size: 12px !important;
              }
            }
            i {
              font-size: 14px !important;
            }
            em {
              font-size: 5px !important;
              padding: 1px 5px !important;
            }
          }
        }
        .bg-pic {
          width: 100%;
          height: 70px;
        }
      }
      &.defaultcommodityList3 {
        width: 100%;
        flex-direction: row !important;
        margin-left: 0 !important;
        margin-right: 0 !important;
        margin-top: 0 !important;
        height: 105px;
        display: flex;
        .bg-pic {
          width: 40%;
          height: 100%;
          // float: left;
        }
        .text {
          width: 60%;
          // float: right;
        }
      }
      &.defaultcommodityList4 {
        &:nth-of-type(3n-2) {
          width: 100% !important;
          margin-left: 0px !important;
          margin-right: 0px !important;
          .bg-pic {
            width: 100%;
            height: 240px;
          }
        }
        &:nth-of-type(3n-1) {
          margin-left: 0px !important;
          .bg-pic {
            width: 100%;
            height: 120px;
          }
        }
        &:nth-of-type(3n) {
          margin-left: 0px !important;
          margin-right: 0px !important;
          .bg-pic {
            width: 100%;
            height: 120px;
          }
        }
      }
      &.defaultcommodityList5 {
        width: 100px;
        // height: 160px;
        margin-top: 0 !important;
        margin-right: 0px !important;
        &:first-of-type {
          margin-left: 0px !important;
        }
        .text {
          h5 {
            font-size: 12px !important;
          }
          p {
            font-size: 10px !important;
          }
          .mony {
            span {
              font-size: 12px !important;
              i {
                font-size: 12px !important;
              }
            }
            i {
              font-size: 14px !important;
            }
            em {
              font-size: 5px !important;
              padding: 1px 5px !important;
            }
          }
        }
        .bg-pic {
          width: 100px;
          height: 70px;
        }
      }
      /* 标签 */
      // .marks {
      //   &:nth-of-type(1) {
      //     position: absolute;
      //     top: 5px;
      //     right: 0;
      //   }
      //   &:nth-of-type(2) {
      //     position: absolute;
      //     top: 10px;
      //     display: flex;
      //     right: 5px;
      //   }
      //   &:nth-of-type(3) {
      //     position: absolute;
      //     top: 5px;
      //     right: 5px;
      //   }
      //   &:nth-of-type(4) {
      //     position: absolute;
      //     top: 5px;
      //     right: 5px;
      //   }
      // }
      // /deep/.van-tag--mark{
      //   border-radius: 10px 0px 0px 10px !important;
      //   padding-right: 3px;
      //   padding-left: 8px;
      // }
      img {
        width: 100%;
        height: 100%;
        display: block;
        overflow: hidden;
      }
      /* 文字 */
      .text {
        padding: 10px;
        width: 100%;
        box-sizing: border-box;
        height: 100%;
        /* 商品名称 */
        h5 {
          font-size: 14px;
          line-height: 20px;
          margin: 0 0 5px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        /* 商品描述 */
        p {
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          height: 16px;
          color: #999;
          font-size: 12px;
          line-height: 16px;
        }
        /* 视频价格 */
        .mony {
          height: 44px;
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            font-size: 16px;
            color: #65c4aa;
            i {
              font-size: 12px;
            }
          }
          i {
            font-size: 16px;
            line-height: 44px;
            color: #65c4aa;
          }
          em {
            font-style: normal;
            padding: 2px 7px;
            font-size: 12px;
            border: 1px solid rgb(101, 196, 170);
            &:nth-of-type(1) {
              border-radius: 10px;
              color: rgb(101, 196, 170);
            }
            &:nth-of-type(2) {
              background-color: rgb(101, 196, 170);
              border-radius: 10px;
              color: #fff;
            }
            &:nth-of-type(3) {
              color: rgb(101, 196, 170);
            }
            &:nth-of-type(4) {
              background-color: rgb(101, 196, 170);
              color: #fff;
            }
          }
        }
      }
    }
  }
  .defaultcommodityListFlex{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .tab-type2 {
    /deep/.van-tabs__wrap {
      min-height: 44px;
    }
    /deep/.van-tabs__line {
      height: 2px;
    }
  }
  .type3 {
    /deep/.van-tree-select__content {
      flex: 3.9 !important;
      .defaultcommodityList3 {
        height: 84px !important;
        .bg-pic {
          height: 84px !important;
        }
      }
      .text {
        width: 150px;
        h5 {
          font-size: 12px !important;
        }
        p {
          font-size: 10px !important;
        }
        .mony {
          span {
            font-size: 12px !important;
            i {
              font-size: 12px !important;
            }
          }
          i {
            font-size: 14px !important;
          }
          em {
            font-size: 5px !important;
            padding: 1px 5px !important;
          }
        }
      }
    }
    /deep/.van-sidebar-item {
      font-size: 16px;
    }
  }
}
</style>
