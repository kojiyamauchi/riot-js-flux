    <!--  Custom DOM Definition. -->
    <back-github class={ displayed: true} ref="back-github">

      <!-- Insert Components / Layout -->
      <a href="https://github.com/kojiyamauchi/riot_js_flux">Back<br><span>To</span><br>GitHub</a>
      <!-- Insert Components End. -->

      <!-- CSS Definition. Using Sass. -->
      <style type="scss">
      :scope {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        margin: auto;
        width: 80px;
        height: 80px;
        border-radius: 80px;
        background-color: #999999;
        text-align: center;
        cursor: pointer;
        transform: scale(0);
        transition: all 0.25s ease-out;
        &.on {
          transition: transform 0.25s ease-out 1s;
          transform: scale(1);
        }
        &.alpha {
          opacity: 1;
          transform: scale(1);
          transition: all 0.5s;
        }
        &:hover {
          opacity: 0.75;
          transform: scale(0.9);
          transition: all 0.5s;
        }
        a {
          font-size: 16px;
          color: #fff !important;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-54%);
          cursor: pointer;
          span {
            font-size: 13px;
          }
        }
      }
      </style>
      <!-- CSS End. -->

      <!-- JavaScript / Logic -->
      <script>
      </script>
      <!-- JavaScript End. -->

    </back-github>
    <!--  Custom DOM End. -->
