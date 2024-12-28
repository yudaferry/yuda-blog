import 'package:flutter/material.dart';

class TopMenuWidget extends StatelessWidget {
  const TopMenuWidget({super.key});

  @override
  Widget build(BuildContext context) {
    final menuItemStyle = TextStyle(
      fontSize: MediaQuery.of(context).size.width > 600 ? 24 : 18,
    );

    final menuSpacing = MediaQuery.of(context).size.width > 600 ? 96.0 : 32.0;
    final borderPadding = MediaQuery.of(context).size.width > 600 ? 16.0 : 8.0;

    return Container(
      decoration: BoxDecoration(
        border: Border(
          top: BorderSide(
            color: Theme.of(context).colorScheme.primary,
            width: 2,
          ),
        ),
      ),
      padding: EdgeInsets.only(top: borderPadding),
      child: Row(
        spacing: menuSpacing,
        mainAxisSize: MainAxisSize.min,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          SizedBox(width: 1.0),
          TextButton(
            child: Text('About', style: menuItemStyle),
            onPressed: () {},
          ),
          TextButton(
            child: Text('Portfolio', style: menuItemStyle),
            onPressed: () {},
          ),
          TextButton(
            child: Text('Blog', style: menuItemStyle),
            onPressed: () {},
          ),
          SizedBox(width: 1.0),
        ],
      ),
    );
  }
}
